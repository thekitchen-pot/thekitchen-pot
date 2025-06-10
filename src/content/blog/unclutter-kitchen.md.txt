---
title: 10 Reasons Why You Can't Unclutter Your Kitchen
slug: unclutter-kitchen
layout: ../../layouts/BlogLayout.astro
pubDate: 2025-04-17
modDate: 2025-04-17
author: boniface-muriuki
image: /images/blog/bluphone.jpg
excerpt: A cool description for your post should always go into this space. Make
  it SEO friendly
category: kitchenware
tags:
  - Testing a new post, new post was tested, kitchen uncluttering
source: decap
---
### **1. Verify the Slug Field in Content Files**

First, confirm that your content files (e.g., Markdown files) have a valid `slug` field in their frontmatter.
For example, a valid `my-post.md` should include:

If the `slug` field still contains `{{slugify title}}` (the template literal) instead of a resolved value, your CMS configuration is incorrect.
Ensure Decap CMS is **saving the actual slug** (not the template) by:

* Using `default: "{{slugify title}}"` in the CMS config (as [previously shown](https://chatgpt.com/c/5d4b3e18-10f3-42f7-8c82-5e2a0f3c8a4b)).
* Testing with new entries to confirm the slug auto-generates properly.

markdownCopy
