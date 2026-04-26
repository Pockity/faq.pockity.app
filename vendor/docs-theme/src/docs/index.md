---
layout: base.njk
title: Welcome to DZDocs
toc: true
eleventyNavigation:
  key: Introduction
  order: 1
---

This is a sample documentation page mimicking the Apple Developer Documentation style.

## Getting Started

To get started with this theme, you just need to clone the repository and run the build command.

```bash
npm install
npx @11ty/eleventy --serve
```

### Why this theme?

It focuses on **readability** and **clarity**. Documentation should be easy to navigate and easy to read.

{% callout "note" %}
This is a sample note using the new callout shortcode. It mimics Apple's documentation style.
{% endcallout %}

## Code Example

Here is a Swift code example:

```swift
import SwiftUI

struct HelloWorld: View {
    var body: some View {
        Text("Hello, World!")
            .padding()
            .background(Color.blue)
            .foregroundColor(.white)
            .cornerRadius(10)
    }
}
```

## Images and Video

Responsive images are a core part of this theme.

![Sample Image](https://via.placeholder.com/800x400)

Text continues after the image to show alignment and spacing.
