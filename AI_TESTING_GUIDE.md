# AI Features Testing Guide

## Quick Test Checklist

### 1. Environment Setup ✅

- [x] `.env.local` file created with GEMINI_API_KEY
- [x] API key is valid
- [x] Build successful

### 2. Test AI Chat Assistant

**Location**: `/chat` → Click "AI Assistant" tab

**Test Steps**:

1. Navigate to http://localhost:3000/chat
2. Click on the "AI Assistant" tab
3. Type a medical question: "What are the symptoms of pneumonia?"
4. Click Send or press Enter
5. Wait 2-5 seconds for AI response

**Expected Result**:

- AI responds with medical information about pneumonia symptoms
- Response includes confidence score badge
- Disclaimer message shown at bottom

**Troubleshooting**:

- If no response: Check browser console for errors (F12)
- If "Failed to get response": Check server logs
- If API error: Verify GEMINI_API_KEY in .env.local

### 3. Test AI Diagnosis Assistant

**Location**: `/clinician` → Click "AI Assistant" tab

**Test Steps**:

1. Navigate to http://localhost:3000/clinician
2. Click on the "AI Assistant" tab
3. Enter symptoms: "fever, cough, headache, fatigue"
4. Click "Analyze Symptoms"
5. Wait 3-5 seconds for results

**Expected Result**:

- 3 diagnosis suggestions appear
- Each with ICD-10 code
- Confidence scores (70-100%)
- Recommended tests listed
- Medical disclaimer at bottom

### 4. Test AI Insights (Top Nav Bar)

**Location**: Any page → Click "AI Insights" in top right

**Test Steps**:

1. Navigate to any page (e.g., dashboard)
2. Click "AI Insights" button (lightbulb icon) in top navigation bar
3. Right panel should slide in

**Expected Result**:

- Right panel opens showing AI insights
- Sample insights displayed
- AI Engine version shown at bottom

## Common Issues & Solutions

### Issue 1: "Failed to generate chat response"

**Cause**: API key not loaded or invalid

**Solution**:

```bash
# 1. Check .env.local exists
ls .env.local

# 2. Verify content
cat .env.local

# 3. Restart dev server
npm run dev
```

### Issue 2: Chat not responding

**Cause**: API route error or network issue

**Solution**:

1. Open browser console (F12)
2. Check for errors in Console tab
3. Check Network tab for failed requests
4. Look for `/api/ai/chat` request
5. Check response status and error message

### Issue 3: TypeScript errors

**Cause**: Type definitions not loaded

**Solution**:

```bash
# Rebuild the project
npm run build

# If still issues, clean and rebuild
rm -rf .next
npm run build
```

## Manual API Testing

### Test Chat API Directly

```bash
curl -X POST http://localhost:3000/api/ai/chat \
  -H "Content-Type: application/json" \
  -d '{
    "messages": [
      {"role": "user", "content": "What is hypertension?"}
    ],
    "userRole": "doctor"
  }'
```

**Expected Response**:

```json
{
  "response": {
    "message": "Hypertension, also known as high blood pressure...",
    "confidence": 85,
    "disclaimer": "This information is AI-generated..."
  }
}
```

### Test Diagnosis API

```bash
curl -X POST http://localhost:3000/api/ai/diagnosis \
  -H "Content-Type: application/json" \
  -d '{
    "symptoms": ["fever", "cough", "headache"],
    "vitals": {
      "temperature": 101.5,
      "heartRate": 88
    }
  }'
```

## Server Logs

To see detailed AI processing logs:

```bash
# Start dev server with logs visible
npm run dev

# Watch for these log messages:
# - "Chat API called with: ..."
# - "Generating chat response for role: ..."
# - "Chat response generated, length: ..."
```

## Performance Benchmarks

| Feature               | Expected Response Time |
| --------------------- | ---------------------- |
| Chat Response         | 2-5 seconds            |
| Diagnosis Suggestions | 3-5 seconds            |
| Treatment Plan        | 5-7 seconds            |
| SOAP Note             | 3-4 seconds            |
| Situation Report      | 4-6 seconds            |

## Success Indicators

✅ **AI Chat Working**:

- Messages send successfully
- AI responds within 5 seconds
- Confidence scores displayed
- No console errors

✅ **AI Diagnosis Working**:

- Symptoms analyzed successfully
- 3 suggestions returned
- ICD-10 codes present
- Confidence scores 70%+

✅ **AI Insights Working**:

- Right panel opens
- Sample insights visible
- No layout issues

## Next Steps After Testing

1. **If all tests pass**: AI features are working correctly!
2. **If some tests fail**: Check specific troubleshooting section
3. **If all tests fail**: Verify GEMINI_API_KEY and restart server

## Support

For issues:

1. Check browser console (F12)
2. Check server terminal logs
3. Verify .env.local file
4. Restart dev server
5. Clear browser cache

---

**Last Updated**: January 2026  
**Status**: Ready for Testing
