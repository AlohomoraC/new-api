# HandyAi 用户使用说明文档

欢迎使用 HandyAi 提供的 AI 服务。本平台聚合了多种主流 AI 模型，支持统一的 API 调用方式。

- **官方接口地址 (Base API)**: `https://us.uniqueding.xyz/v1`

---

## 1. 获取 API 令牌 (API Key)

1. 登录您的账号后，进入 **令牌 (Tokens)** 页面。
2. 点击 **添加新令牌**，设置名称及额度，保存后复制生成的 `sk-xxx` 令牌。

---

## 2. 软件配置指引

### Claude Code

#### macOS / Linux (终端)
在终端执行或写入 `~/.zshrc` 或 `~/.bashrc`：

```bash
export CLAUDE_CODE_API_BASE="https://us.uniqueding.xyz/v1"
export CLAUDE_CODE_API_KEY="您的令牌"
```
运行 `source ~/.zshrc` 使其生效。

#### Windows (PowerShell)
在 PowerShell 中执行：

```powershell
$env:CLAUDE_CODE_API_BASE="https://us.uniqueding.xyz/v1"
$env:CLAUDE_CODE_API_KEY="您的令牌"
```
若要永久生效，请在系统环境变量设置中添加 `CLAUDE_CODE_API_BASE` 和 `CLAUDE_CODE_API_KEY`。

---

### Codex

#### macOS / Linux (终端)
在终端执行或写入 `~/.zshrc` 或 `~/.bashrc`：

```bash
export CODEX_API_BASE_URL="https://us.uniqueding.xyz/v1"
export CODEX_API_KEY="您的令牌"
```
运行 `source ~/.zshrc` 使其生效。

#### Windows (PowerShell)
在 PowerShell 中执行：

```powershell
$env:CODEX_API_BASE_URL="https://us.uniqueding.xyz/v1"
$env:CODEX_API_KEY="您的令牌"
```
若要永久生效，请在系统环境变量设置中添加 `CODEX_API_BASE_URL` 和 `CODEX_API_KEY`。

---

## 3. 模型切换与使用

在上述软件启动后，通常会默认使用配置的模型。如需切换：

- **通过命令行参数**：部分软件支持在启动时通过 `--model` 参数指定模型，例如 `codex chat --model gpt-4-turbo`。
- **通过环境变量**：某些工具也支持 `MODEL` 或 `DEFAULT_MODEL` 环境变量来切换默认模型。
- **模型 ID 示例**：
  - OpenAI: `gpt-3.5-turbo`, `gpt-4-turbo`
  - Claude: `claude-3-5-sonnet`, `claude-3-opus`
  - Gemini: `gemini-1.5-pro`

---

## 4. 通用集成配置

如果您使用其他支持 OpenAI 格式的软件（如 ChatBox, NextChat），请统一配置如下：

- **API 地址 (Base URL)**: `https://us.uniqueding.xyz/v1`
- **API Key**: `您的令牌`