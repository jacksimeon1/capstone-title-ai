import jsPDF from 'jspdf';
import { ConceptBlueprint, ConflictCheckResult, FeasibilityReport, GeneratedTitleCandidate, TitleAnalysisResult } from '../types';

interface ExportData {
  projectIdea?: string;
  generatedTitles?: GeneratedTitleCandidate[];
  analysisResult?: TitleAnalysisResult;
  conflictResult?: ConflictCheckResult;
  feasibilityReport?: FeasibilityReport;
  conceptBlueprint?: ConceptBlueprint;
}

export const exportService = {
  // 1. Export as Plain TXT
  downloadTxt(data: ExportData, filename = 'capstone-analysis-report.txt'): void {
    const text = this.generatePlainText(data);
    const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.click();
    URL.revokeObjectURL(url);
  },

  // 2. Export as Markdown / DOCX-Compatible Text
  downloadMarkdown(data: ExportData, filename = 'capstone-analysis-report.md'): void {
    const md = this.generateMarkdown(data);
    const blob = new Blob([md], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.click();
    URL.revokeObjectURL(url);
  },

  // 3. Export as Defense-Ready PDF
  downloadPdf(data: ExportData, filename = 'capstone-title-analysis-report.pdf'): void {
    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
    });

    let y = 20;
    const margin = 20;
    const pageWidth = doc.internal.pageSize.getWidth();
    const contentWidth = pageWidth - margin * 2;

    // Header styling
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(18);
    doc.setTextColor(15, 23, 42); // academic-900
    doc.text('CAPSTONE TITLE AI', margin, y);
    y += 7;

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(11);
    doc.setTextColor(100, 116, 139); // academic-500
    doc.text('Academic Title Validation & Feasibility Evaluation Report', margin, y);
    y += 6;
    doc.setDrawColor(226, 232, 240);
    doc.setLineWidth(0.5);
    doc.line(margin, y, pageWidth - margin, y);
    y += 10;

    // Date & Meta
    doc.setFontSize(9);
    doc.setTextColor(100, 116, 139);
    doc.text(`Generated: ${new Date().toLocaleDateString()} | Formal Research Artifact`, margin, y);
    y += 8;

    // Section 1: Project Idea
    if (data.projectIdea) {
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(12);
      doc.setTextColor(30, 41, 59);
      doc.text('1. PROJECT CONCEPT & IDEA', margin, y);
      y += 6;

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(10);
      doc.setTextColor(51, 65, 85);
      const splitIdea = doc.splitTextToSize(data.projectIdea, contentWidth);
      doc.text(splitIdea, margin, y);
      y += splitIdea.length * 5 + 6;
    }

    // Section 2: Title Analysis
    if (data.analysisResult) {
      if (y > 240) { doc.addPage(); y = 20; }
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(12);
      doc.setTextColor(30, 41, 59);
      doc.text('2. PROPOSED TITLE & STRUCTURAL EVALUATION', margin, y);
      y += 6;

      doc.setFont('helvetica', 'italic');
      doc.setFontSize(10);
      doc.setTextColor(37, 99, 235); // navy-600
      const splitTitle = doc.splitTextToSize(`"${data.analysisResult.title}"`, contentWidth);
      doc.text(splitTitle, margin, y);
      y += splitTitle.length * 5 + 4;

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(9);
      doc.setTextColor(51, 65, 85);
      doc.text(`Domain: ${data.analysisResult.structure.domain}`, margin, y);
      y += 5;
      doc.text(`System Delivery: ${data.analysisResult.structure.systemType}`, margin, y);
      y += 5;
      doc.text(`Target Users: ${data.analysisResult.structure.targetUsers}`, margin, y);
      y += 5;
      doc.text(`Overall Academic Quality: ${data.analysisResult.qualityMetrics.overallQuality}% (Clarity: ${data.analysisResult.qualityMetrics.clarity}%, Specificity: ${data.analysisResult.qualityMetrics.specificity}%, Feasibility: ${data.analysisResult.qualityMetrics.feasibility}%)`, margin, y);
      y += 8;

      // Problems detected
      if (data.analysisResult.problemsDetected.length > 0) {
        doc.setFont('helvetica', 'bold');
        doc.text('Detected Ambiguities / Weaknesses:', margin, y);
        y += 5;
        doc.setFont('helvetica', 'normal');
        data.analysisResult.problemsDetected.forEach((prob) => {
          const probText = `• [${prob.type}] ${prob.description}`;
          const splitProb = doc.splitTextToSize(probText, contentWidth);
          doc.text(splitProb, margin + 2, y);
          y += splitProb.length * 4.5;
        });
        y += 4;
      }

      // Improved Revisions
      if (y > 240) { doc.addPage(); y = 20; }
      doc.setFont('helvetica', 'bold');
      doc.text('Recommended Academic Revisions:', margin, y);
      y += 5;
      doc.setFont('helvetica', 'normal');
      const revisions = [
        `[Conservative] ${data.analysisResult.improvedRevisions.conservative.title}`,
        `[Professional] ${data.analysisResult.improvedRevisions.professional.title}`,
        `[Advanced] ${data.analysisResult.improvedRevisions.advanced.title}`,
        `[Research-Oriented] ${data.analysisResult.improvedRevisions.researchOriented.title}`,
      ];
      revisions.forEach((rev) => {
        const splitRev = doc.splitTextToSize(rev, contentWidth);
        doc.text(splitRev, margin + 2, y);
        y += splitRev.length * 4.5 + 2;
      });
      y += 6;
    }

    // Section 3: Generated Candidates
    if (data.generatedTitles && data.generatedTitles.length > 0) {
      if (y > 230) { doc.addPage(); y = 20; }
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(12);
      doc.setTextColor(30, 41, 59);
      doc.text('3. AI-GENERATED TITLE CANDIDATES', margin, y);
      y += 6;

      data.generatedTitles.slice(0, 4).forEach((candidate, idx) => {
        if (y > 250) { doc.addPage(); y = 20; }
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(9);
        doc.setTextColor(15, 23, 42);
        const titleLine = `${idx + 1}. [${candidate.paradigm}] ${candidate.title}`;
        const split = doc.splitTextToSize(titleLine, contentWidth);
        doc.text(split, margin, y);
        y += split.length * 4.5 + 1;

        doc.setFont('helvetica', 'normal');
        doc.setFontSize(8.5);
        doc.setTextColor(71, 85, 105);
        const rat = doc.splitTextToSize(`Rationale: ${candidate.rationale}`, contentWidth);
        doc.text(rat, margin + 4, y);
        y += rat.length * 4 + 3;
      });
      y += 4;
    }

    // Section 4: Feasibility & Conflict
    if (data.feasibilityReport) {
      if (y > 240) { doc.addPage(); y = 20; }
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(12);
      doc.setTextColor(30, 41, 59);
      doc.text('4. FEASIBILITY & RESOURCE REQUIREMENTS', margin, y);
      y += 6;

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(9);
      doc.setTextColor(51, 65, 85);
      doc.text(`Overall Complexity: ${data.feasibilityReport.overallComplexity}`, margin, y);
      y += 5;
      doc.text(`Estimated Timeline: ~${data.feasibilityReport.timeFeasibility.estimatedMonths} months (${data.feasibilityReport.timeFeasibility.timelineFeasibility})`, margin, y);
      y += 5;
      doc.text(`Technical Feasibility: ${data.feasibilityReport.technicalFeasibility.verdict} (${data.feasibilityReport.technicalFeasibility.score}%)`, margin, y);
      y += 5;
      doc.text(`Scope Assessment: ${data.feasibilityReport.scopeFeasibility.verdict}`, margin, y);
      y += 7;
    }

    // Disclaimer footer
    if (y > 260) { doc.addPage(); y = 20; }
    doc.setDrawColor(226, 232, 240);
    doc.line(margin, y, pageWidth - margin, y);
    y += 5;
    doc.setFont('helvetica', 'italic');
    doc.setFontSize(8);
    doc.setTextColor(148, 163, 184);
    doc.text('Note: This report is generated as an AI-assisted academic advisory artifact and does not replace formal faculty thesis committee approval.', margin, y);

    doc.save(filename);
  },

  generateMarkdown(data: ExportData): string {
    let md = `# CAPSTONE TITLE ANALYSIS REPORT\n`;
    md += `*Generated by Capstone Title AI on ${new Date().toLocaleDateString()}*\n\n`;
    md += `---\n\n`;

    if (data.projectIdea) {
      md += `## 1. Project Concept & Idea\n\n${data.projectIdea}\n\n`;
    }

    if (data.analysisResult) {
      md += `## 2. Title Structural Analysis\n\n`;
      md += `**Proposed Title**: *${data.analysisResult.title}*\n\n`;
      md += `- **Domain**: ${data.analysisResult.structure.domain}\n`;
      md += `- **System Delivery**: ${data.analysisResult.structure.systemType}\n`;
      md += `- **Target Beneficiaries**: ${data.analysisResult.structure.targetUsers}\n`;
      md += `- **Overall Academic Quality Score**: ${data.analysisResult.qualityMetrics.overallQuality}%\n\n`;

      if (data.analysisResult.problemsDetected.length > 0) {
        md += `### Weaknesses & Ambiguities Detected\n\n`;
        data.analysisResult.problemsDetected.forEach((p) => {
          md += `- **[${p.type}]** (${p.severity}): ${p.description}\n  *Actionable Recommendation*: ${p.suggestion}\n`;
        });
        md += `\n`;
      }

      md += `### Improved Academic Revisions\n\n`;
      md += `1. **Conservative Revision**: ${data.analysisResult.improvedRevisions.conservative.title}\n`;
      md += `2. **Professional Revision**: ${data.analysisResult.improvedRevisions.professional.title}\n`;
      md += `3. **Advanced Revision**: ${data.analysisResult.improvedRevisions.advanced.title}\n`;
      md += `4. **Research-Oriented Revision**: ${data.analysisResult.improvedRevisions.researchOriented.title}\n\n`;
    }

    if (data.generatedTitles && data.generatedTitles.length > 0) {
      md += `## 3. Candidate Capstone Titles\n\n`;
      data.generatedTitles.forEach((t, i) => {
        md += `### ${i + 1}. [${t.paradigm}] ${t.title}\n\n`;
        md += `- **Rationale**: ${t.rationale}\n`;
        md += `- **Problem Addressed**: ${t.problemAddressed}\n`;
        md += `- **Key Features**: ${t.keyFeatures.join(', ')}\n`;
        md += `- **Estimated Scope**: ${t.potentialScope}\n\n`;
      });
    }

    if (data.feasibilityReport) {
      md += `## 4. Feasibility Analysis\n\n`;
      md += `- **Overall Complexity**: ${data.feasibilityReport.overallComplexity}\n`;
      md += `- **Estimated Timeline**: ~${data.feasibilityReport.timeFeasibility.estimatedMonths} Months\n`;
      md += `- **Technical Feasibility**: ${data.feasibilityReport.technicalFeasibility.verdict}\n`;
      md += `- **Scope Feasibility**: ${data.feasibilityReport.scopeFeasibility.verdict}\n\n`;
    }

    if (data.conflictResult && data.conflictResult.matches.length > 0) {
      md += `## 5. Potential Title Conflicts & Similarity Check\n\n`;
      md += `**Risk Level**: ${data.conflictResult.overallConflictRisk}\n\n`;
      data.conflictResult.matches.slice(0, 3).forEach((m) => {
        md += `- **Similar Title**: *${m.benchmark.title}* (${m.similarityScore}% overlap)\n`;
        md += `  - *Overlapping Concepts*: ${m.matchingConcepts.join(', ')}\n`;
        md += `  - *Advisory*: ${m.explanation}\n`;
      });
      md += `\n`;
    }

    md += `---\n*Disclaimer: AI-assisted estimates are advisory recommendations intended to support student preparation for academic defense review.*`;
    return md;
  },

  generatePlainText(data: ExportData): string {
    return this.generateMarkdown(data).replace(/[#*`_\[\]]/g, '');
  },
};
