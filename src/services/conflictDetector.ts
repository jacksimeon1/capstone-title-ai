import { BenchmarkTitle, ConflictCheckResult, ConflictMatch } from '../types';
import { BENCHMARK_TITLES } from '../data/benchmarkTitles';

// Stop words to remove from comparison
const STOP_WORDS = new Set([
  'a', 'an', 'the', 'and', 'or', 'for', 'of', 'in', 'on', 'with', 'using', 'based',
  'system', 'application', 'app', 'to', 'at', 'by', 'an', 'is', 'it', 'web', 'mobile',
]);

function tokenize(text: string): Set<string> {
  return new Set(
    text
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, '')
      .split(/\s+/)
      .filter((w) => w.length > 2 && !STOP_WORDS.has(w))
  );
}

function calculateJaccardSimilarity(setA: Set<string>, setB: Set<string>): number {
  if (setA.size === 0 || setB.size === 0) return 0;
  let intersectionCount = 0;
  for (const item of setA) {
    if (setB.has(item)) intersectionCount++;
  }
  const unionCount = setA.size + setB.size - intersectionCount;
  return unionCount === 0 ? 0 : intersectionCount / unionCount;
}

export function detectTitleConflicts(
  proposedTitle: string,
  customDatabase: BenchmarkTitle[] = []
): ConflictCheckResult {
  const allBenchmarks = [...BENCHMARK_TITLES, ...customDatabase];
  const queryTokens = tokenize(proposedTitle);
  const queryLower = proposedTitle.toLowerCase();

  const matches: ConflictMatch[] = [];

  for (const bench of allBenchmarks) {
    const benchTokens = tokenize(bench.title);
    const benchLower = bench.title.toLowerCase();

    // 1. Lexical token similarity
    const lexicalScore = calculateJaccardSimilarity(queryTokens, benchTokens);

    // 2. Domain & keyword matching
    let keywordOverlapCount = 0;
    const matchingConcepts: string[] = [];

    for (const kw of bench.keywords) {
      const kwTokens = tokenize(kw);
      let match = false;
      for (const t of kwTokens) {
        if (queryLower.includes(t)) {
          match = true;
          break;
        }
      }
      if (match) {
        keywordOverlapCount++;
        matchingConcepts.push(kw);
      }
    }

    // 3. Shared target users
    for (const user of bench.targetUsers) {
      if (queryLower.includes(user.toLowerCase().split(' ')[0])) {
        matchingConcepts.push(`Target User: ${user}`);
      }
    }

    // 4. Shared technology
    for (const tech of bench.technologies) {
      if (queryLower.includes(tech.toLowerCase())) {
        matchingConcepts.push(`Technology: ${tech}`);
      }
    }

    // Shared tokens
    const sharedTokensList: string[] = [];
    for (const token of queryTokens) {
      if (benchTokens.has(token)) {
        sharedTokensList.push(token);
      }
    }

    // Composite similarity calculation (0 to 100)
    const keywordScore = bench.keywords.length > 0 ? keywordOverlapCount / bench.keywords.length : 0;
    const compositeScore = Math.min(
      96,
      Math.round(lexicalScore * 65 + keywordScore * 35 + (sharedTokensList.length >= 3 ? 15 : 0))
    );

    // Only include if there's meaningful similarity
    if (compositeScore >= 20 || sharedTokensList.length >= 2) {
      // Formulate distinct differences
      const differences: string[] = [];
      if (!queryLower.includes(bench.program.toLowerCase())) {
        differences.push(`Categorized under ${bench.program} rather than proposed scope`);
      }
      const benchUniqueTokens = [...benchTokens].filter((t) => !queryTokens.has(t)).slice(0, 3);
      if (benchUniqueTokens.length > 0) {
        differences.push(`Benchmark emphasizes distinct features: ${benchUniqueTokens.join(', ')}`);
      }
      differences.push(`Originally completed at ${bench.institution} (${bench.year})`);

      // Formulate objective explanation
      let explanation = `The proposed project shares conceptual ground with "${bench.title}".`;
      if (compositeScore >= 70) {
        explanation = `High structural and keyword overlap detected. Both projects address similar core objectives (${sharedTokensList.slice(0, 3).join(', ')}). Distinct methodological differentiation is strongly advised to prevent defense panel objections.`;
      } else if (compositeScore >= 45) {
        explanation = `Moderate overlap in problem domain. The core system paradigm is related, but your implementation may diverge in target audience or technical framework.`;
      } else {
        explanation = `Low to moderate thematic alignment. The project touches on similar institutional needs, but the concrete execution appears distinct.`;
      }

      matches.push({
        benchmark: bench,
        similarityScore: compositeScore,
        matchingConcepts: matchingConcepts.length > 0 ? Array.from(new Set(matchingConcepts)) : sharedTokensList,
        differences,
        explanation,
      });
    }
  }

  // Sort descending by similarity score
  matches.sort((a, b) => b.similarityScore - a.similarityScore);

  const highestSimilarityScore = matches.length > 0 ? matches[0].similarityScore : 0;
  let overallConflictRisk: 'Low' | 'Moderate' | 'High' = 'Low';
  let academicAdvice = 'No critical overlap found. Your title appears sufficiently novel within our benchmark corpus.';

  if (highestSimilarityScore >= 70) {
    overallConflictRisk = 'High';
    academicAdvice =
      'Potential overlap detected. The proposed title is very similar to previously defended or approved projects. We strongly recommend consulting your capstone adviser to establish a unique contribution, novel dataset, or distinct algorithmic approach.';
  } else if (highestSimilarityScore >= 40) {
    overallConflictRisk = 'Moderate';
    academicAdvice =
      'Moderate thematic similarity identified with existing capstone titles. Human/instructor review recommended to ensure specific organizational scope or regional customization is clearly highlighted.';
  }

  return {
    proposedTitle,
    overallConflictRisk,
    highestSimilarityScore,
    matches: matches.slice(0, 8),
    academicAdvice,
  };
}
