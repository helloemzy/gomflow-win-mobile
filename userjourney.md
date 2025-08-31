# DROPWAVE: User Flow Architecture
## MVP Critical Paths

---

## 🎯 FLOW HIERARCHY

**Priority 1: The Money Path** (Must work flawlessly)
**Priority 2: The Viral Path** (Growth engine)
**Priority 3: The Trust Path** (Conversion optimizer)

---

## 🚀 CREATOR FLOWS

### FLOW 1: First-Time Setup (Target: <90 seconds)
```
Landing → "Start Selling in 60 Seconds" →
Phone number (SMS verification) →
Create password →
Auto-detect TikTok handle →
SUCCESS: Dashboard appears
```
**Critical Decision:** No email required initially. Phone = higher trust, faster verification.

### FLOW 2: Campaign Creation (Target: <2 minutes)
```
Dashboard → "New Drop" button →

STEP 1: Product
- Upload photo (auto-enhance)
- Name + one-line description
- Price (show profit calculator live)

STEP 2: The Hook
- Set minimum (slider: 10-100)
- Set deadline (presets: 3, 7, 14 days)
- Optional: Early bird discount

STEP 3: Make it Yours
- Choose vibe (6 templates)
- Preview on phone mockup
- Copy link

PUBLISH → Live immediately
```
**Critical Decision:** No Stripe setup required until first sale (remove friction).

### FLOW 3: First Sale Moment
```
Push notification → 
"🎉 YOUR FIRST ORDER!" →
Confetti animation →
"Complete setup to get paid" →
30-second Stripe Connect OAuth →
Dashboard shows live progress
```
**Critical Decision:** Celebrate EVERY milestone. Dopamine = retention.

### FLOW 4: Campaign Monitoring
```
Dashboard home shows:
- Live order count (BIG NUMBER)
- Progress bar (% to goal)
- Time remaining (countdown)
- "Share now" sticky button

Swipe down refreshes (haptic feedback)
```

### FLOW 5: Success/Failure
```
SUCCESS PATH:
Push: "YOU DID IT! 🎉" →
Dashboard: Confetti rain →
"Download buyer list" →
"Message your supporters" →
Auto-generate success post →
"Launch next drop"

FAILURE PATH:
Push: "Campaign ended" →
"17/30 orders (so close!)" →
Three options:
1. Extend 7 days (one-time)
2. Lower minimum to 17
3. Refund all → "Try again"
```

---

## 🛍️ BUYER FLOWS

### FLOW 6: Discovery to Purchase (Target: <30 seconds)
```
TikTok bio link →
Page loads (show product IMMEDIATELY) →
See counter: "23/30 ordered" →
Scroll = more social proof →

TAP "Join the Drop" →
Apple Pay slides up →
Double-click to confirm →
SUCCESS: "You're buyer #24!"
```
**Critical Decision:** NO account creation. Guest checkout only.

### FLOW 7: Post-Purchase Hook
```
Success screen shows:
- Your buyer number (screenshot-worthy)
- "Share to help hit goal" (incentive: 5% off if campaign succeeds)
- Live progress bar
- "Notify me when it ships"

EMAIL CAPTURE: 
"Where should we send updates?"
(Optional but 85% fill rate with this framing)
```

### FLOW 8: The Waiting Game
```
DAILY ENGAGEMENT:
Day 1: "27/30 - Almost there!"
Day 3: "2 days left - Share to help"
Day 5: "LAST CHANCE - 29/30!"

SUCCESS: "WE DID IT! Preparing your order"
FAILURE: "Campaign didn't reach goal - Refunded"
```

---

## 🔄 VIRAL FLOWS

### FLOW 9: Organic Sharing
```
Buyer shares →
"I just backed [Creator]'s drop! #Buyer24" →
Link preview shows:
- Progress bar visual
- "Only 7 spots left"
- Creator's avatar
- Price
```

### FLOW 10: Referral Mechanics
```
Share with your code →
Friend clicks →
Banner: "Felix gave you 5% off" →
Friend buys →
Felix gets: "Your friend joined! You saved $3"
```

### FLOW 11: FOMO Triggers
```
VISITOR SEES:
- "3 people viewing now"
- "Last order: 12 min ago"
- Progress jumps (animated)
- "Only 48 hours left"
```

---

## 🛡️ TRUST FLOWS

### FLOW 12: Verification Badge
```
Creator profile →
"Get verified" →
Connect TikTok OAuth →
Auto-verify if >10K followers →
Blue check appears on all campaigns
```

### FLOW 13: Money-Back Guarantee
```
Footer link: "Protected Purchase" →
Modal explains:
- Automatic refund if goal not met
- Stripe payment protection
- Creator verification
- "10,000 happy buyers"
```

### FLOW 14: Social Proof Display
```
LIVE TICKER:
"Sarah joined 2 min ago"
"Mike joined 5 min ago"
"+3 others in last hour"

TRUST BADGES:
✓ Verified Creator
✓ Stripe Secured
✓ 100% Money-Back
```

---

## 🚨 EDGE CASES & RECOVERY FLOWS

### FLOW 15: Payment Failure
```
Card declined →
"Try another payment method" →
Show: Apple Pay, Google Pay, Card →
Still fails? →
"Reserve your spot" (email capture) →
24-hour email reminder
```

### FLOW 16: Campaign Extension
```
80% of goal, 2 hours left →
Auto-prompt creator: "Extend?" →
One-click: +3 days →
Notify all buyers: "Extended! Share now"
```

### FLOW 17: Abandoned Cart
```
Started checkout, didn't complete →
15 minutes: Push notification →
2 hours: SMS (if provided) →
24 hours: "Campaign 90% full" →
Stop if campaign ends
```

### FLOW 18: Creator Churn Prevention
```
No campaign in 14 days →
SMS: "Your fans miss you!" →
Show top-performing template →
"Copy this winning campaign" →
Pre-filled with previous product
```

---

## 📱 MOBILE-FIRST INTERACTIONS

### Touch Gestures
- **Swipe up:** Quick buy
- **Swipe down:** Refresh count
- **Long press:** Share options
- **Pinch:** Zoom product image
- **Shake:** Celebrate success

### Haptic Feedback
- Order placed: Success haptic
- Milestone reached: Celebration haptic
- Share action: Light tap
- Error: Warning buzz

---

## 🎪 SHOWSTOPPER MOMENTS

### The Counter Jump
```
When order placed:
Number grows (bouncy animation) →
Progress bar fills (liquid animation) →
If milestone: Screen flash + confetti
```

### The Final Countdown
```
Last hour:
- Red countdown timer
- Push to all interested
- "FINAL HOUR" banner
- Live visitor count doubles
```

### The Success Moment
```
Goal reached:
- Full-screen celebration
- Auto-generate story post
- Unlock "Founder's Badge" for first 30
- Creator gets champagne emoji rain
```

---

## 📊 FLOW METRICS

**Must Track:**
1. **Visitor → Buyer:** Target >8% conversion
2. **Share Rate:** Target >30% of buyers share
3. **Viral Coefficient:** Target K>1.2
4. **Setup Completion:** Target >90%
5. **Campaign Success Rate:** Target >70%

**Speed Metrics:**
- Page load: <1 second
- Checkout: <20 seconds
- Campaign creation: <2 minutes
- Stripe connect: <45 seconds

---

## 🚫 WHAT WE'RE NOT BUILDING (MVP)

1. ~~Creator analytics dashboard~~ (Week 2)
2. ~~Multiple products per campaign~~
3. ~~Inventory management~~
4. ~~Custom domain support~~
5. ~~Advanced CSS editor~~ (Templates only)
6. ~~Email marketing tools~~
7. ~~Discount codes~~
8. ~~Affiliate program~~
9. ~~API access~~
10. ~~Mobile app~~ (PWA only)

---

## ✅ FLOW TESTING CHECKLIST

**The Creator Gauntlet:**
- [ ] Can grandma create a campaign?
- [ ] Can you do it one-handed?
- [ ] Can you do it drunk at 2am?
- [ ] Does it work on 2-year-old Android?
- [ ] Does it handle 10,000 simultaneous buyers?

**The Buyer Sprint:**
- [ ] TikTok to purchase: <30 seconds?
- [ ] Did they share? Why/why not?
- [ ] Did they screenshot their number?
- [ ] Would they buy again?
- [ ] Did they trust the process?

---

**Remember:** Every extra tap is a lost sale. Every moment of friction is a dead campaign. Every confused user is negative word-of-mouth. Ship the flows that make money, drive virality, and build trust. Everything else can wait.

**The MVP Mantra:** *"If it doesn't help creators get paid or buyers feel special, it doesn't ship."*

Ready to design the customization engine, or should we dive into the technical implementation plan?