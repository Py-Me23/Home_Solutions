---
trigger: always_on
---

# Agent Constraints
- **Primary Goal Only:** Execute the specific change or task requested by the user. 
- **No Unrequested Refactors:** Do not perform "code cleanup," "optimizations," or "refactoring" unless explicitly asked.
- **Stop Conditions:** Immediately after the requested code change is implemented, terminate the task. Do not scan the file for further improvements.
- **Disable Auto-Linting:** Do not attempt to fix linting or style errors created by your edits unless the user asks for a fix.