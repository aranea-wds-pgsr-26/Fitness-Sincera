// Loads this design system's stylesheets into the template. In a consuming
// project, point `base` at the bound DS folder relative to this file (e.g.
// '_ds/<folder>' at the project root, '../_ds/<folder>' one level down).
// The compiled bundle is loaded as a blocking <script> in the DC helmet so it
// is guaranteed ready before the app code evaluates.
(() => {
  const base = '../..';
  for (const p of ["tokens/fonts.css","tokens/base.css","tokens/colors.css","tokens/typography.css","tokens/spacing.css","styles.css"]) {
    const l = document.createElement('link');
    l.rel = 'stylesheet'; l.href = base + '/' + p;
    document.head.appendChild(l);
  }
})();
