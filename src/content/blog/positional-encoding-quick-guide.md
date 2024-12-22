---
title: "Positional Encoding in Transformers"
pubDate: "15.12.2024"
heroImage: "/blog/robot-chicken-egg.webp"
description: "A quick mini-guide about positional encoding in transformers"
keywords:
  - transformers
  - positional encoding
  - NLP
  - machine learning
  - deep learning
  - sine and cosine functions
  - word embeddings
  - sequence modeling
  - AI
  - neural networks
---

Positional encoding is a way to tell transformer models the position of each word in a sentence. Transformers process all words at once, not one by one like older models (RNNs or LSTMs), so they need extra information to know word order.

## Why do we need it?

Word order matters. For example:

> the chicken came before the egg

is not the same as

> the egg came before the chicken

The meaning is completely different because of the order. Without positional encoding, transformers would treat both sentences the same since they don’t know the positions of the words.

## How is it done?

Transformers use simple **sine and cosine functions** to create patterns that represent word positions. These patterns are added to the word embeddings (the vector representations of words).

For even positions: &nbsp; $PE_{\text{pos}, 2i} = \sin\left(\frac{\text{pos}}{10000^{\frac{2i}{d_{\text{model}}}}}\right)$

For uneven positions: &nbsp; $PE_{\text{pos}, 2i+1} = \cos\left(\frac{\text{pos}}{10000^{\frac{2i}{d_{\text{model}}}}}\right)$

Where position $pos$ is the position of the word in the sequence (e.g. 1 for first word) and dimension $i$ the dimension in the positional encoding vector.

This method works because the sine and cosine functions create smooth, unique patterns that help the model understand word order.

## Why sin and cos functions?

Sine and cosine functions are periodic, meaning their values repeat infinitely. This allows transformers to handle sequences of any length, as there’s no fixed limit on the positions they can encode.

## We simply add some value to the encodings of the words?

Yes, it’s that simple! Adding positional encodings gives the model enough information to figure out the order of words while still focusing on their meaning.

## How can the model learn from this if it only receives the summarized values?

Even though we just add positional encoding to word embeddings, the model can still learn to use this information. When the transformer processes the input, it notices patterns in the combined vectors (word embedding + positional encoding). These patterns help it figure out the positions of words relative to each other and capture word order effectively during training.

---

If you want to learn more check out [this post on machinelearningmastery.com](https://machinelearningmastery.com/a-gentle-introduction-to-positional-encoding-in-transformer-models-part-1/)
