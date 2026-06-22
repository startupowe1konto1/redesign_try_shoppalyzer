/**
 * Programmatic, vector PDF generator for the Shoppalyzer sample report.
 * Draws selectable text with jsPDF (no html2canvas screenshot), embeds Roboto
 * for full Polish glyph support, and auto-breaks pages.
 *
 * Lazy-loaded from SampleReport.tsx so jsPDF + the embedded font stay out of
 * the initial bundle. Reads the shared sample data from '@/data/sample-report'.
 */
import jsPDF from 'jspdf';
import { ROBOTO_REGULAR_B64, ROBOTO_BOLD_B64 } from './pdf-fonts';
import { LOGO_B64, LOGO_W, LOGO_H } from './pdf-brand';
import {
  PRODUCT, BAND, ACTIONS, LONG_TERM, HYGIENE, GAP_ROWS, KPIS, INSIGHTS, COMPETITORS, zl,
} from '@/data/sample-report';

/* palette (RGB) */
const NAVY: [number, number, number] = [30, 77, 114];
const AMBER: [number, number, number] = [232, 132, 58];
const DANGER: [number, number, number] = [201, 58, 58];
const SUCCESS: [number, number, number] = [34, 160, 100];
const INK: [number, number, number] = [38, 50, 62];
const MUTED: [number, number, number] = [120, 130, 140];
const BORDER: [number, number, number] = [223, 221, 214];
const ZONE: [number, number, number] = [205, 235, 220];
const WARN_BG: [number, number, number] = [252, 244, 224];
const WARN_INK: [number, number, number] = [146, 102, 20];
const YOU_BG: [number, number, number] = [250, 235, 235];

const PAGE_W = 210;
const PAGE_H = 297;
const M = 14; // margin
const CW = PAGE_W - M * 2; // content width
const FOOTER_Y = PAGE_H - 10;

export function generateReportPdf() {
  const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });

  doc.addFileToVFS('Roboto-Regular.ttf', ROBOTO_REGULAR_B64);
  doc.addFont('Roboto-Regular.ttf', 'Roboto', 'normal');
  doc.addFileToVFS('Roboto-Bold.ttf', ROBOTO_BOLD_B64);
  doc.addFont('Roboto-Bold.ttf', 'Roboto', 'bold');

  const f = (w: 'normal' | 'bold') => doc.setFont('Roboto', w);
  const color = (c: [number, number, number]) => doc.setTextColor(c[0], c[1], c[2]);
  const fill = (c: [number, number, number]) => doc.setFillColor(c[0], c[1], c[2]);
  const stroke = (c: [number, number, number]) => doc.setDrawColor(c[0], c[1], c[2]);

  let y = 0;

  const ensure = (h: number) => {
    if (y + h > FOOTER_Y) {
      doc.addPage();
      y = M + 2;
    }
  };

  /* wrapped paragraph; returns new y */
  const para = (text: string, x: number, maxW: number, size: number, weight: 'normal' | 'bold', c: [number, number, number], lh = size * 0.5) => {
    f(weight); doc.setFontSize(size); color(c);
    const lines = doc.splitTextToSize(text, maxW) as string[];
    for (const line of lines) {
      ensure(lh);
      doc.text(line, x, y);
      y += lh;
    }
    return y;
  };

  const sectionHeader = (eyebrow: string, title: string) => {
    ensure(16);
    y += 4;
    f('bold'); doc.setFontSize(7.5); color(MUTED);
    doc.text(eyebrow.toUpperCase(), M, y, { charSpace: 0.4 });
    y += 5;
    f('bold'); doc.setFontSize(13); color(NAVY);
    doc.text(title, M, y);
    y += 3;
    stroke(BORDER); doc.setLineWidth(0.3); doc.line(M, y, M + CW, y);
    y += 5;
  };

  /* ── Header band (navy) with navy logo on a light plate ── */
  fill(NAVY); doc.rect(0, 0, PAGE_W, 30, 'F');
  // light plate so the navy logo doesn't blend into the navy band
  const logoH = 9;
  const logoW = logoH * (LOGO_W / LOGO_H);
  const pad = 3;
  const plateY = 8;
  fill([250, 250, 247]); doc.roundedRect(M, plateY, logoW + pad * 2, logoH + pad * 2, 2, 2, 'F');
  doc.addImage(LOGO_B64, 'PNG', M + pad, plateY + pad, logoW, logoH);
  // right side: subtitle + date (white on navy)
  f('normal'); doc.setFontSize(9); color([200, 215, 228]);
  doc.text('Raport analizy konkurencji', PAGE_W - M, 14, { align: 'right' });
  const dateStr = new Date().toLocaleDateString('pl-PL', { day: '2-digit', month: 'long', year: 'numeric' });
  f('bold'); doc.setFontSize(9); color([255, 255, 255]);
  doc.text(dateStr, PAGE_W - M, 20, { align: 'right' });
  // amber accent divider under the band
  fill(AMBER); doc.rect(0, 30, PAGE_W, 1, 'F');

  y = 42;

  /* ── Product ── */
  f('bold'); doc.setFontSize(7.5); color(MUTED);
  doc.text(PRODUCT.category.toUpperCase(), M, y, { charSpace: 0.4 });
  y += 6;
  para(PRODUCT.title, M, CW, 15, 'bold', NAVY, 7);
  y += 2;

  /* ── 1. Twoja oferta — oś cenowa ── */
  sectionHeader('Pozycja cenowa', 'Twoja oferta');
  para(PRODUCT.verdict, M, CW, 12, 'bold', DANGER, 6);
  y += 1;
  para(PRODUCT.verdictNote, M, CW, 9.5, 'normal', MUTED, 4.6);
  y += 8;

  // rail
  const railX = M;
  const railW = CW;
  const railY = y;
  const pos = (v: number) => railX + ((v - BAND.axisMin) / (BAND.axisMax - BAND.axisMin)) * railW;
  ensure(24);
  // track
  fill([235, 236, 238]); doc.roundedRect(railX, railY, railW, 2.2, 1.1, 1.1, 'F');
  // good zone
  fill(ZONE); doc.roundedRect(pos(BAND.floor), railY, pos(BAND.ceiling) - pos(BAND.floor), 2.2, 1.1, 1.1, 'F');
  // suggested tick
  stroke(SUCCESS); doc.setLineWidth(0.8); doc.line(pos(BAND.suggested), railY - 1.5, pos(BAND.suggested), railY + 3.7);
  // your marker
  fill(DANGER); doc.circle(pos(BAND.yours), railY + 1.1, 2.4, 'F');
  fill([255, 255, 255]); doc.circle(pos(BAND.yours), railY + 1.1, 0.9, 'F');
  // labels
  f('normal'); doc.setFontSize(7.5); color(MUTED);
  doc.text('← taniej', railX, railY + 8);
  doc.text('drożej →', railX + railW, railY + 8, { align: 'right' });
  f('bold'); doc.setFontSize(8); color(SUCCESS);
  doc.text('sugestia ' + zl(BAND.suggested), pos(BAND.suggested), railY + 13, { align: 'center' });
  color(DANGER);
  doc.text('Ty teraz ' + zl(BAND.yours), pos(BAND.yours), railY + 18, { align: 'center' });
  y = railY + 24;

  /* ── 2. Co zrobić — wg priorytetu ── */
  sectionHeader('Plan działania', 'Co zrobić — wg priorytetu');
  ACTIONS.forEach((a, i) => {
    ensure(14);
    const boxTop = y - 1;
    // number badge
    fill(AMBER); doc.circle(M + 3.5, y + 2, 3, 'F');
    f('bold'); doc.setFontSize(9); color([255, 255, 255]);
    doc.text(String(i + 1), M + 3.5, y + 3.2, { align: 'center' });
    // title + evidence
    f('bold'); doc.setFontSize(10.5); color(NAVY);
    const tLines = doc.splitTextToSize(a.title, CW - 12) as string[];
    let ty = y + 2;
    tLines.forEach((l) => { doc.text(l, M + 9, ty); ty += 5; });
    f('normal'); doc.setFontSize(8.5); color(MUTED);
    const eLines = doc.splitTextToSize(a.evidence, CW - 12) as string[];
    eLines.forEach((l) => { doc.text(l, M + 9, ty); ty += 4.2; });
    y = ty + 3;
    void boxTop;
  });
  // long-term
  ensure(14);
  fill([235, 240, 245]); doc.roundedRect(M, y - 2, CW, 13, 1.5, 1.5, 'F');
  f('bold'); doc.setFontSize(10); color(NAVY);
  doc.text(LONG_TERM.title, M + 4, y + 3);
  f('bold'); doc.setFontSize(6.5); color(NAVY);
  doc.text('DŁUGOTERMINOWE', PAGE_W - M - 4, y + 3, { align: 'right' });
  f('normal'); doc.setFontSize(8.5); color(MUTED);
  doc.text(LONG_TERM.evidence, M + 4, y + 8);
  y += 15;
  // hygiene note
  const hyLines = doc.splitTextToSize(HYGIENE, CW - 8) as string[];
  const hyH = hyLines.length * 4.4 + 5;
  ensure(hyH);
  fill(WARN_BG); doc.roundedRect(M, y - 2, CW, hyH, 1.5, 1.5, 'F');
  f('normal'); doc.setFontSize(8.5); color(WARN_INK);
  let hy = y + 3;
  hyLines.forEach((l) => { doc.text(l, M + 4, hy); hy += 4.4; });
  y += hyH + 2;

  /* ── 3. Ty vs zwycięzcy ── */
  sectionHeader('Czynnik po czynniku', 'Ty vs zwycięzcy');
  const c1 = M, c2 = M + 58, c3 = M + 104, c4 = M + CW;
  f('bold'); doc.setFontSize(7.5); color(MUTED);
  ensure(6);
  doc.text('CZYNNIK', c1, y); doc.text('TY', c2, y); doc.text('ZWYCIĘZCY', c3, y); doc.text('STATUS', c4, y, { align: 'right' });
  y += 2; stroke(BORDER); doc.setLineWidth(0.2); doc.line(M, y, M + CW, y); y += 4;
  GAP_ROWS.forEach((r) => {
    ensure(7);
    f('bold'); doc.setFontSize(9.5); color(NAVY); doc.text(r.factor, c1, y);
    f(r.advantage === 'worse' ? 'bold' : 'normal'); doc.setFontSize(9.5);
    color(r.advantage === 'worse' ? DANGER : INK); doc.text(r.yours, c2, y);
    f('normal'); color(INK); doc.text(r.winners, c3, y);
    f('bold'); doc.setFontSize(8.5);
    if (r.advantage === 'equal') { color(MUTED); doc.text('na równi', c4, y, { align: 'right' }); }
    else { color(DANGER); doc.text('luka', c4, y, { align: 'right' }); }
    y += 3; stroke([238, 237, 232]); doc.setLineWidth(0.15); doc.line(M, y, M + CW, y); y += 4;
  });
  const eq = GAP_ROWS.filter((r) => r.advantage === 'equal').map((r) => r.factor.toLowerCase());
  if (eq.length) { y += 1; para('Na równi: ' + eq.join(', ') + '.', M, CW, 8.5, 'normal', SUCCESS, 4.4); }

  /* ── 4. Kontekst rynku ── */
  sectionHeader('Struktura popytu', 'Kontekst rynku');
  ensure(20);
  const kpiW = CW / KPIS.length;
  KPIS.forEach((k, i) => {
    const kx = M + i * kpiW;
    stroke(BORDER); doc.setLineWidth(0.2); doc.roundedRect(kx + 1, y, kpiW - 2, 16, 1.5, 1.5, 'S');
    f('normal'); doc.setFontSize(7); color(MUTED);
    doc.text(k.label.toUpperCase(), kx + kpiW / 2, y + 6, { align: 'center' });
    f('bold'); doc.setFontSize(13); color(NAVY);
    doc.text(k.value, kx + kpiW / 2, y + 12.5, { align: 'center' });
  });
  y += 22;
  INSIGHTS.forEach((ins) => {
    f('normal'); doc.setFontSize(9.5); color(INK);
    const lines = doc.splitTextToSize(ins, CW - 6) as string[];
    ensure(lines.length * 4.6 + 1);
    fill(AMBER); doc.circle(M + 1, y - 1.4, 0.8, 'F');
    lines.forEach((l, li) => { doc.text(l, M + 5, y); if (li < lines.length - 1) y += 4.6; });
    y += 5.5;
  });

  /* ── 5. Konkurenci ── */
  sectionHeader('Wg sprzedaży 30 dni', 'Konkurenci');
  COMPETITORS.forEach((c) => {
    ensure(11);
    if (c.you) { fill(YOU_BG); doc.roundedRect(M, y - 1, CW, 10, 1.2, 1.2, 'F'); }
    f('bold'); doc.setFontSize(10); color(c.you ? DANGER : NAVY);
    doc.text(c.seller + (c.you ? '   ← to Ty' : ''), M + 3, y + 4);
    if (c.badges.length) {
      f('normal'); doc.setFontSize(7.5); color(MUTED);
      doc.text(c.badges.join(' · '), M + 3, y + 8);
    }
    f('bold'); doc.setFontSize(10.5); color(NAVY);
    doc.text(zl(c.price), PAGE_W - M - 3, y + 4, { align: 'right' });
    f('normal'); doc.setFontSize(8); color(MUTED);
    doc.text(c.sales + ' szt.', PAGE_W - M - 3, y + 8, { align: 'right' });
    y += 12;
  });

  /* ── Footers (page X of Y) ── */
  const total = doc.getNumberOfPages();
  for (let p = 1; p <= total; p++) {
    doc.setPage(p);
    f('normal'); doc.setFontSize(7); color(MUTED);
    doc.text(`Strona ${p} z ${total}  ·  Shoppalyzer`, PAGE_W / 2, FOOTER_Y + 4, { align: 'center' });
  }

  const dateName = new Date().toLocaleDateString('pl-PL', { day: '2-digit', month: '2-digit', year: 'numeric' }).replace(/\./g, '-');
  doc.save(`Shoppalyzer_Raport_${dateName}.pdf`);
}
