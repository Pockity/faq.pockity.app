---
layout: base.njk
title: Liquid Glass
toc: true
eleventyNavigation:
  key: Liquid Glass
  order: 2
---

Apple's new glass-based user interface system, Liquid Glass, brings a modern, physical aesthetic to macOS and iOS. It prioritizes clarity, depth, and vibrant interactions to create an immersive experience.

## Design Principles

Liquid Glass is built on three core pillars that define its visual language and functional behavior.

### Clarity

Interfaces should be easy to read and navigate. Materials are designed to maintain high legibility even when layered over complex backgrounds.

### Depth

By using realistic shadows and light sources, Liquid Glass creates a clear hierarchy. Elements appear at different altitudes, helping users understand the relationship between various UI components.

### Vibrancy

Vibrancy allows background colors to shine through materials, making the interface feel alive and integrated with the user's content.

{% callout "note" %}
Vibrancy is calculated dynamically based on the content behind the glass material to ensure optimal contrast for text and icons.
{% endcallout %}

## Materials and Effects

The system provides several materials that designers can use to achieve different levels of focus and hierarchy.

- **Thin Glass:** Best for toolbars and tab bars.
- **Thick Glass:** Used for main window backgrounds and sidebars.
- **Ultra Thick Glass:** Ideal for elevated elements like popovers and menus.

### Lighting and Shadows

Liquid Glass uses a global light source to determine the appearance of bevels and shadows.

- **Primary Light:** Casts a subtle highlight on the top edge of elements.
- **Ambient Light:** Softens shadows to ensure they don't look muddy on dark backgrounds.

{% callout "important" %}
When designing for Liquid Glass, avoid using opaque colors for large surfaces. Instead, use the system-defined glass materials to ensure consistency across the platform.
{% endcallout %}

## Implementation

To adopt Liquid Glass in your app, use the new SwiftUI view modifiers that handle material application and vibrancy automatically.

```swift
struct MyView: View {
    var body: some View {
        VStack {
            Text("Hello, Liquid Glass!")
        }
        .background(.glass) // Adopts the system glass material
        .vibrancy(.prominent) // Enhances legibility
    }
}
```

### Best Practices

When building with these new materials, keep the following in mind:

1. **Maintain Legibility:** Always test your UI against various wallpapers.
2. **Use Hierarchy:** Reserve thicker materials for background layers.
3. **Respect Safe Areas:** Ensure your materials extend to the edges of the screen for a truly immersive look.

{% callout "warning" %}
Overusing vibrancy can lead to visual fatigue. Use it purposefully to highlight the most important parts of your interface.
{% endcallout %}
