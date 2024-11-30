---
title: "Positional Encoding in Transformers visualized"
pubDate: "9.11.2024"
heroImage: "/blog/positional-encoding-visualized.png"
description: "Some fancy description about positional encoding"
---

# Dummy Text created with ChatGPT

# Positional Encoding in Transformers – An Illustrated Guide

When Transformers came on the scene, they transformed (pun intended) the field of natural language processing (NLP) and, later, computer vision and other domains. Unlike previous models, Transformers don’t have an inherent sequential structure, which allows them to process data more efficiently by looking at entire sequences in parallel. But if there's no built-in sequential ordering, how does a Transformer know which word comes first or last in a sentence? The answer lies in **positional encoding**.

In this post, we’ll dive into what positional encoding is, why it’s needed in Transformers, and how it works. And because concepts like these can be hard to grasp with text alone, I’ll include visualizations to help clarify each point. Let’s get started!

---

## Why Do We Need Positional Encoding?

Transformers are based on the **self-attention mechanism**, which allows each word in a sentence to look at every other word. This setup helps capture relationships between words without assuming any particular order. However, order matters in language! For example, “The dog chased the cat” is very different from “The cat chased the dog.” Without a way to identify the position of each word, a Transformer would treat sentences as bags of words and lose essential information about word order.

Positional encoding solves this by adding unique information to each word’s representation to denote its position within the sequence. This way, the Transformer can interpret the relationships between words in the correct order.

---

## How Positional Encoding Works: A Deep Dive

To encode positional information, the original Transformer model uses a set of mathematical functions. Here's how it works step by step.

1. **Sinusoidal Encoding**:
   Each position in a sequence is assigned a unique encoding vector based on sine and cosine functions. The idea is to create a pattern that varies consistently for each position but remains unique across positions. This way, even if the model looks at all tokens at once, it can distinguish each token based on its position.

   - For even positions, the encoding uses the sine function.
   - For odd positions, the encoding uses the cosine function.

   This encoding is defined as follows for position \( p \) and dimension \( i \):

   \[
   PE(p, 2i) = \sin\left(\frac{p}{10000^{\frac{2i}{d\_{\text{model}}}}}\right)
   \]

   \[
   PE(p, 2i+1) = \cos\left(\frac{p}{10000^{\frac{2i}{d\_{\text{model}}}}}\right)
   \]

   where \( d\_{\text{model}} \) is the dimensionality of the model.

2. **Why Sine and Cosine?**
   Using sine and cosine functions ensures that each position has a unique encoding, but it also allows the model to learn relative positions easily. For instance, the encoding difference between position 1 and position 2 will be consistent across dimensions, which makes it easier for the Transformer to learn positional relationships.

3. **Visualizing Positional Encodings**:
   Let’s look at a plot of positional encodings across a few dimensions. Imagine plotting sine and cosine functions across 50 or 100 positions in a sequence. For each dimension, the pattern has a unique frequency due to the scaling factor \( \frac{1}{10000^{\frac{2i}{d\_{\text{model}}}}} \).

---

## Interpreting the Visualizations

In visualizations, you’ll typically see positional encodings as wavy lines for each position in the sequence. These waves will have different frequencies for each dimension, with some waves having long wavelengths (low frequency) and others having short wavelengths (high frequency). The high-frequency components help the model differentiate nearby positions, while low-frequency components differentiate distant positions.

When you add these positional encodings to the embeddings of each word, you’re effectively telling the model, “This word has this specific position within the sequence.”

---

## How Positional Encoding Helps in Practice

Once the embeddings are adjusted with positional encoding, they retain information about the sequence order, which is crucial for any task where order matters—like translation, text summarization, or question answering. As a result, the Transformer can perform better by understanding which words should be attended to more or less depending on their position in the sequence.

An interesting aspect of sinusoidal encodings is that they allow for extrapolation. Unlike learned positional embeddings (an alternative approach where position embeddings are trained with the model), the sinusoidal approach allows the Transformer to generalize to longer sequences than those encountered during training. This property can be particularly beneficial in applications that may need to process sequences of varying lengths.

---

## Beyond Sinusoidal: Learnable Positional Encodings

While sinusoidal encodings were used in the original Transformer model, many newer architectures use learned positional encodings instead. Here, rather than using a fixed formula, the model learns a unique position encoding during training. Both methods have their advantages—sinusoidal encoding provides generalization to longer sequences, while learned encodings may capture more nuanced positional relationships within the training data.

Some architectures even explore **relative positional encodings**, where only the distance between positions matters, rather than their absolute positions. These are especially useful in tasks like machine translation, where the relative ordering of words is crucial.

---

## Key Takeaways

1. **Purpose of Positional Encoding**: Transformers require positional encoding to retain word order information, as they lack inherent sequence structure.
2. **Sinusoidal Encoding**: Sine and cosine functions create unique patterns for each position, giving the model relative positioning cues.
3. **Learnable vs. Fixed Encodings**: While sinusoidal encodings are fixed, learned encodings allow the model to tailor positional information based on training data. Relative encodings offer a third approach focused on the distance between tokens rather than absolute positions.

---

## Wrapping Up

Understanding positional encoding is crucial to grasping how Transformers work. Visualizing these encodings helps demystify the math behind the model and illustrates how each word’s position affects its representation. Whether you're new to NLP or deep into Transformer research, knowing how these positional cues work will enrich your appreciation of these powerful models.

I hope this guide helped clarify positional encodings for you! Let me know if you have any questions, and stay tuned for more visual deep dives into the world of deep learning.
