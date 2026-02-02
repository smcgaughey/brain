---
title: Critical Care Billing Capture Rate Study
type: research
aliases: [CC billing, critical care billing, Newgard billing study, CC capture rate]
collaborators: [Craig Newgard, Obert Xu, Rochelle Fu, Skyler Kieran, Miriam Elman]
status: in-preparation
position: 1st-author
theme: informatics-qi
journal: Applied Clinical Informatics
permalink: research/critical-care
---

# Critical Care Billing Capture Rate Study

**Status:** Data Collection Starting (February 2026)  
**Position:** 1st author  
**Theme:** Informatics & QI

## Submission

| Field | Value |
|-------|-------|
| Target Journal | Applied Clinical Informatics (primary target) |
| Manuscript Draft Target | End of February/March 2026 |
| Submitted | - |
| Decision | - |

## Co-Authors
- Craig Newgard (Senior author/mentor)
- Obert Xu (2nd author - clinical expertise, CC eligibility criteria)
- Rochelle Fu (Statistical analysis)
- Skyler (Data analyst)
- Miriam (if involved in data analysis)

## Project Summary
Multi-site retrospective descriptive study examining critical care billing "capture rates" (CC-eligible encounters billed as critical care / total CC-eligible encounters) across three Oregon emergency departments over 36 months (January 2023-January 2026). Study characterizes differences between academic (Marquam Hill) and community sites (AHPL, HMC) with approximately 300K encounters and 150 providers. Employs visual storytelling approach with provider-level variability analysis using "spaghetti plots." Secondary aim examines temporal patterns around June 2024 ED note template implementation at academic site.

## Current Status
Data pull scheduled for February 6, 2026 (1 week). Moving forward with data collection despite awaiting Craig Newgard's feedback on January 14, 2026 research plan. Key methodological decisions finalized: using 12-month lookback period for Charlson Comorbidity Index calculation from ICD-10 codes. Skyler has finalized data extraction specifications for approximately 300K encounters across three sites (11/1/2015 - 11/30/2025).
## Key Decisions
- **May 2025**: Craig Newgard agrees to serve as senior author; emphasizes descriptive "visual storytelling" approach over complex statistical modeling
- **May 2025**: Expanded from single-site intervention study to multi-site descriptive landscape characterization based on mentor guidance
- **Late 2025**: Preliminary data analysis reveals academic site improvements preceded June 2024 template intervention
- **Late 2025**: Study reframed as primarily descriptive analysis of CC billing patterns across ED types rather than intervention effectiveness study
- **January 2026**: Finalized methodology prioritizing simple visual analysis with provider-level variability ("spaghetti plots") per Craig's preference for feasibility

## Action Items
- [ ] Receive Craig Newgard's feedback on January 14, 2026 email
- [ ] Finalize critical care eligibility criteria with Obert
- [ ] Execute data pull with Skyler (February 2026)
- [ ] Meet with Rochelle Fu to develop statistical analysis plan
- [ ] Calculate Charlson Comorbidity Indices from ICD-10 codes
- [ ] Create monthly trend visualizations (3-panel by site)
- [ ] Generate provider variability spaghetti plots
- [ ] Conduct equity analysis across demographics
- [ ] Draft manuscript (target: end of February/March 2026)

## Timeline
- **May 23, 2025**: Initial outreach to Craig Newgard for mentorship; Craig agrees to participate
- **May 27, 2025**: Meeting with Craig, Miriam, Obert to discuss project scope
- **June 14, 2024** (retrospective): ED note template with CC section/prompt implemented at Marquam Hill
- **January 2023-January 2026**: Study period (36 months of encounter data)
- **January 14, 2026**: Comprehensive research plan sent to Craig for review
- **February 6, 2026 (scheduled)**: Data pull execution by Skyler
- **February/March 2026 (planned)**: Manuscript drafting
- **March/April 2026 (planned)**: Target submission

## Notes

### Methodology Evolution
Project underwent significant transformation from intervention-focused design to primarily descriptive analysis. Craig's guidance emphasized keeping approach "feasible and not too complicated," focusing on "telling stories via pictures" rather than complex statistical modeling. Preliminary data showing academic site improvement preceded June 2024 template intervention reinforced wisdom of descriptive approach.

### Critical Care Eligibility Criteria
Comprehensive criteria established encompassing: ESI Level 1, critical procedures (CPR, intubation, cardioversion, pacing), ICU admissions from ED, critical medications (vasopressors, antiarrhythmics, thrombolytics, IM antipsychotics), and critical orders. Obert providing clinical expertise for final criterion validation.

### Primary Outcome
**CC Capture Rate** = (CC-eligible encounters billed as critical care) / (Total CC-eligible encounters) × 100
This proportion-based metric with 100% as optimal allows straightforward descriptive analysis without complex adjustment.

### Key Variables
**Essential (Tier 1)**: Site, date, provider ID, CC eligibility flag, final E&M codes (99281-99285, 99291-99292), basic demographics (age, sex, race, ethnicity)
**Important (Tier 2)**: ESI level, insurance type, length of stay, discharge disposition, provider type (attending/resident/APP)
**Patient Complexity**: Charlson Comorbidity Index (calculated from ICD-10 codes with 12-month lookback period) + ESI level - though Steve questions necessity for primarily descriptive study

### Outstanding Methodological Questions
1. Are essential data elements missing from current variable list?
2. Is Charlson Comorbidity Index appropriate for ED patients, or should alternatives be considered?
3. Do patient complexity measures add value to primarily descriptive study, or should approach remain simpler given bounded 0-100% outcome?
4. Does overall approach align with Craig's vision from May 2025 meeting?

**Note**: CCI methodology resolved (January 30, 2026) - using 12-month lookback period for diagnosis codes. Awaiting Craig's feedback on broader methodological questions, but proceeding with data collection.

### Expected Findings
Preliminary data suggests community sites (AHPL ~90-95%, HMC ~85-90%) maintain higher CC billing capture rates than academic site (Marquam Hill baseline ~65-75%, improved to ~80%). Craig predicted "fascinating" provider variability ranging from 5% to 90% between individual providers. Study may reveal academic site improvements resulted from system-wide changes (education, awareness, evolving documentation practices) rather than specific template intervention.

### Publication Strategy
Target: Applied Clinical Informatics. Strength lies in honest characterization of CC billing landscape across ED types rather than forced intervention narrative. Novel findings include community sites outperforming academic center and sustained provider-level variability patterns. Multi-site descriptive approach rare in literature.

### Collaborator Roles
- **Craig Newgard**: Senior author providing methodological guidance emphasizing descriptive simplicity
- **Obert Xu**: Clinical validation of CC eligibility criteria, 2nd author given significant project contributions
- **Rochelle Fu**: Statistical analysis guidance and plan development
- **Skyler**: Data analyst executing SQL data pull from Epic
- **Miriam**: Potential involvement in data analysis (to be confirmed)

- **January 30, 2026**: Finalized CCI methodology - 12-month lookback period for diagnosis codes
- **January 30, 2026**: Confirmed data pull specifications with Skyler for February 6, 2026 execution
- **January 30, 2026**: Decision to proceed with data collection while awaiting Craig's final approval

### Data Pull Specifications (February 6, 2026)

**Base Population**:
- Patients meeting CC billing query criteria (comprehensive eligibility definitions)
- Date range: 11/1/2015 - 11/30/2025 (10-year period)
- Sites: Marquam Hill (OHSU), HMC, AHPL

**Deliverables**:
1. **Site-Month Aggregation**: Critical Care % by Month for each hospital
2. **Provider-Month Aggregation**: Critical Care % by Month & Provider
   - Spreadsheet format
   - Line chart: month (x-axis), CC % (y-axis), separate line for each provider
3. **Patient-Level Detail** with following variables:
   - Encounter ID (de-identified)
   - Encounter Date
   - Patient Age
   - Patient Sex
   - Attending Provider ID (de-identified)
   - Site (MH/AHP/HMC)
   - CC Billed (Y/N if CPT 99291 or 99292 present)
   - Final EM Code (99281-99285, 99291-99292)
   - ESI Level (1-5)
   - Length of Stay in minutes (arrival to ED departure)
   - Insurance Type (Medicare/Medicaid/Commercial/Other)
   - ED Disposition (Home/Admit/Transfer/Other)
   - **Charlson Comorbidity Index** (calculated from ICD-10 diagnoses with 12-month lookback period)

**Note**: All patients in dataset are CC-eligible by inclusion criteria, so separate CC_Eligible flag not needed in patient-level output.