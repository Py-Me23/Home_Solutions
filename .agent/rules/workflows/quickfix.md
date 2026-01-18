---
trigger: always_on
---

---
description: "Executes a rapid code change with zero post-processing or extra thinking."
---

# Quick Fix Workflow
1. **Identify Change**: Read the user's request: {{args}}.
2. **Execute Only**: Apply the specific code change requested.
3. **No Optimization**: 
   - DO NOT run lints. 
   - DO NOT refactor surrounding code. 
   - DO NOT suggest "improvements."
4. **Terminate**: Stop immediately after the file is saved. Do not ask "is there anything else?"ss