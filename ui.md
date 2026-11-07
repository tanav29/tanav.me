# UI UX Rules for Dead Minimal Portfolio

## Shared implementation

- Keep the existing narrow, single-column portfolio layout.
- Use `site-shell`, `site-main`, and `site-footer` for aligned page gutters.
- Use `page-stack` for 24px page spacing and `content-list` for 16px list gaps.
- Use `portfolio-section` for 24px vertical padding with a theme border divider.
- Use `section-header`, `section-heading`, and `page-title` for shared heading alignment and typography.
- Use `section-link`, `inline-link`, and `icon-action` for consistent interaction states.
- Use theme tokens (`border-border`, `text-muted-foreground`, `bg-muted`) instead of page-specific neutral colors.
- Use `rounded-md` for controls, `rounded-lg` for previews and grouped controls, and `rounded-xl` for dialogs.

## 1. Core Philosophy

- Prioritize calm, peaceful visual tone.
- Strip away anything that doesn’t communicate meaning.
- Every pixel (padding, margin, opacity) must feel handcrafted.
- Interface should feel like it was built with intention.

## 2. Layout

- Use generous whitespace; let elements breathe.
- Maximum width: 640–768px for reading comfort.
- Use consistent spacing scale (4, 8, 12, 16, 24, 32px).
- Avoid grid clutter. Prefer single-column flows.

## 3. Typography

- Primary font: Geist.
- Backup fonts: Inter, system-ui.
- Use large, soft headlines; medium-weight body.
- Opacity adjustments for hierarchy, not color changes.
- Avoid harsh black; prefer near-black (#0A0A0A or #111111).

## 4. Color & Tone

- Stick to ultra-light backgrounds (#FAFAFA – #FFFFFF range).
- Avoid saturated colors.
- Accent colors should be extremely subtle.
- Use opacity instead of boldness to create calm hierarchy.

## 5. Components & Elements

- Remove borders unless absolutely necessary.
- Use soft shadows sparingly for depth.
- Rounded corners should be large (xl–2xl) to keep friendliness.
- Buttons must be minimal: text-first, soft hover states.

## 6. Motion / Animation

- Motion must be silent and gentle.
- Use micro-animations at 100–200ms.
- Fade and slight scale transitions only.
- No bouncing, overshoot, or aggressive easing.

## 7. Content Strategy

- Say less. Every sentence must have a purpose.
- Highlight your message, not decoration.
- Consistent tone: confident, calm, intentional.

## 8. Visual Hierarchy

- Use font size, opacity, whitespace instead of colors.
- Keep 1 dominant element per screen.
- Avoid visual noise: icons only if essential.

## 9. Accessibility

- Contrast must remain readable even with low opacity text.
- Touch targets: minimum 40px height.
- Avoid tiny fonts; minimum 15–16px body size.

## 10. Overall Feel Test

Ask yourself:

- "Does this feel peaceful to the eyes?"
- "Does this feel intentionally handcrafted?"
- "Is there anything here that doesn’t need to exist?"
