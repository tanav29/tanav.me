---
title: "Prompt Caching: Stop Making Your AI Read the Same Thing Again"
date: "2026-08-31"
---

Imagine you're building an AI agent.

It has a system prompt, dozens of tools, skills, MCP definitions, and conversation history. Now the agent takes 15 steps to complete a task.

The painful part?

On almost every step, you're sending most of that same context back to the LLM.

Again.

And again.

And yes, you're paying for it.

## Enter Prompt Caching

Prompt caching lets the provider reuse work it has already done.

Suppose your request looks like this:

```text
SYSTEM PROMPT
TOOLS
SKILLS
MCP DEFINITIONS
----------------
LATEST MESSAGE
```

On the next request, only the latest message changes.

Instead of processing the entire prompt from scratch, the provider can reuse the already processed prefix and only work on the new part.

That's a **cache hit**.

The result: lower latency and significantly cheaper input tokens.

---

## But what is actually being cached?

To understand this, we need to briefly talk about the **KV Cache**.

Transformers use attention, which can be represented as:

$$
\text{Attention}(Q, K, V) =
\text{softmax}\left(
\frac{QK^T}{\sqrt{d_k}}
\right)V
$$

Every token produces a **Query (Q)**, **Key (K)**, and **Value (V)**.

During generation, previous tokens don't change. So instead of recomputing their Keys and Values every time, the model stores them in a **KV Cache**.

Think of it as the model taking notes instead of rereading the entire book.

Prompt caching takes a similar idea and applies it across requests.

> **Same prompt prefix → reuse previous computation.**

---

## Why KV Cache becomes a memory problem

Caching isn't free.

The memory required roughly grows with:

$$
\text{KV Memory} \approx
2 \times L \times H \times T \times D \times P
$$

Where:

* \(L\) = number of layers
* \(H\) = number of KV heads
* \(T\) = number of tokens
* \(D\) = head dimension
* \(P\) = bytes per value

Longer context means a bigger KV cache.

And when thousands of users are generating at the same time, GPU memory starts disappearing very quickly.

This is why techniques like **MQA**, **GQA**, **Paged Attention**, and **KV cache quantization** exist.

---

## The most important rule

If you want prompt caching to work well:

> **Keep stable things at the beginning. Keep changing things at the end.**

Good:

```text
SYSTEM PROMPT
TOOLS
SKILLS
MCP DEFINITIONS

----------------

CONVERSATION HISTORY
LATEST TOOL RESULT
CURRENT MESSAGE
```

Bad:

```text
CURRENT TIME
RANDOM REQUEST ID

SYSTEM PROMPT
TOOLS
SKILLS
```

If the beginning keeps changing, the cache may not match.

---

## When does a cache miss happen?

Usually when:

1. **The prompt is too short**
2. **The cache has expired**
3. **The beginning of your prompt keeps changing**
4. **The cached prefix isn't available due to routing or infrastructure differences**

---

## Final thought

Prompt caching sounds like a small optimization until you start building agents.

An agent might make 20 LLM calls while carrying the same 20,000-token context.

Without caching, you're repeatedly paying for the model to read the same thing.

With caching:

```text
First request → Process everything

Next requests → Reuse what hasn't changed
```

The longer your agent runs, the more valuable prompt caching becomes.

**Your AI might not be expensive because it's thinking too much.**

**You might just be paying for it to reread the same instructions 15 times.**
