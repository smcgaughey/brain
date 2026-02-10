# Critical Care Billing Study — Team Meeting Brief
## Friday, February 13, 2026
### Attendees: Steve McGaughey, Rochelle Fu, Craig Newgard, Obert Xu, John Organic-Lee

---

## Purpose of This Meeting

Align the team on the data analysis plan and finalize data elements before the comprehensive data pull. This is the key inflection point between "we have preliminary data" and "we're running the real analysis."

## Project in 60 Seconds

Multi-site retrospective descriptive study examining critical care billing capture rates across three Oregon EDs (OHSU Marquam Hill, AHPL, HMC) over 121 months (Nov 2015–Nov 2025). ~50,390 CC-eligible encounters, ~243 providers. The study characterizes patterns and variation — it is deliberately descriptive, not interventional, per Craig's guidance.

**Key preliminary findings:**
- OHSU academic site: capture rate improved from ~39.5% (Phase 1) to ~74.7% (Phase 4), with major transitions at Feb 2017, Aug 2020, Sep 2023
- Community hospitals (AHPL, HMC): stable at 80-90%
- Massive provider-level variation at OHSU (25-100% range)
- June 2024 ED note template with CC prompt was implemented at Marquam Hill, but improvements preceded it

## Finalized Study Aims

**Primary:** Characterize CC billing capture rates across three EDs over 121 months.

**Secondary:**
1. Identify significant change points using Statistical Process Control (SPC)
2. Quantify provider-level variation within each hospital
3. Describe patient demographics and clinical characteristics associated with CC billing
4. Describe billing patterns across hospital types for benchmarking context (no formal statistical comparison between sites — Craig's guidance re: unmeasured confounding)

## Key Discussion Items for the Meeting

### 1. Data Elements — What Rochelle and the team need to weigh in on

Craig's feedback (Feb 9) identified several additions to the data pull:

| Element | Rationale | Status |
|---|---|---|
| Disposition (ED + inpatient, including mortality) | Confirm we're capturing full patient journey | Needs confirmation with Skyler |
| ICU stay (yes/no) | Many CC patients NOT admitted to ICU — this is an important descriptive finding | New — needs to be added |
| Procedure codes | Describe intervention/resuscitation types to characterize what CC patients receive | New — needs to be added |
| ESI (Emergency Severity Index) | Simple acuity measure for generalizability | Already in dataset? Confirm |
| Charlson Comorbidity Index | Describe patient populations (NOT for cross-site adjustment) | Already planned |

**Question for Rochelle:** Are there additional variables she'd want for the SPC analysis or the descriptive characterization?

### 2. Statistical Analysis Plan — What Rochelle needs to advise on

- **SPC methodology:** What's the right control chart approach for monthly capture rates over 121 months? Are the phase transitions Steve identified visually (Feb 2017, Aug 2020, Sep 2023) consistent with what a formal SPC analysis would detect?
- **Provider variation:** Spaghetti plots are planned per Craig's preference. Does Rochelle recommend any additional measures of variation (ICC, coefficient of variation, funnel plots)?
- **Sample size / power:** This is descriptive, so formal power calculations may not apply, but Rochelle may have thoughts on minimum provider-month thresholds for including a provider in the variation analysis.
- **Equity analysis:** Planned descriptive analysis across demographics — any specific approach Rochelle recommends?

### 3. Data Pull Logistics

- Skyler executed a preliminary pull (~50K encounters)
- Comprehensive pull (~300K encounters) was scheduled for Feb 6 — **confirm status**
- Need to confirm the new variables (ICU stay, procedure codes) can be added to the pull

### 4. Timeline Check

| Milestone | Target |
|---|---|
| Final data pull (with new variables) | Mid-February 2026 |
| Analysis complete | Late February / early March |
| Manuscript draft | End of February / March 2026 |
| Target submission | March/April 2026 |

**Question for the group:** Is this timeline still realistic given the additional data elements?

## Steve's Meeting Goals

1. Get Rochelle's buy-in on the analysis approach and identify any methodological concerns early
2. Confirm the expanded data elements (ICU stay, procedure codes) with the full team
3. Clarify who is doing what — Steve drafts manuscript, Rochelle runs stats, Skyler pulls data, Craig reviews, Obert provides clinical CC expertise, John's role?
4. Set next milestone and follow-up meeting date

## Open Questions / Risks

- **John Organic-Lee's role:** Not previously mentioned in project notes — clarify his contribution and authorship position
- **Data completeness:** Procedure codes may be inconsistently documented, especially in earlier years of the study period
- **Phase transition explanations:** Steve still needs to document what actually changed at OHSU at each of the three transition dates (Feb 2017, Aug 2020, Sep 2023) — this is critical context for the manuscript and may require talking to department leadership
