const express = require('express');
const router = express.Router();

// POST /api/eligibility/voter
router.post('/voter', (req, res) => {
  const { age, citizen, mentalHealth, convicted, inVoterList } = req.body;

  const checks = [];
  let eligible = true;

  if (age < 18) { eligible = false; checks.push({ pass: false, rule: 'Age must be 18 or above', detail: `You are ${age} years old. You must be at least 18 to vote.` }); }
  else { checks.push({ pass: true, rule: 'Age 18+', detail: `Age ${age} — ✅ Eligible` }); }

  if (!citizen) { eligible = false; checks.push({ pass: false, rule: 'Must be an Indian citizen', detail: 'Only Indian citizens can vote.' }); }
  else { checks.push({ pass: true, rule: 'Indian Citizen', detail: '✅ Indian citizenship confirmed' }); }

  if (!mentalHealth) { eligible = false; checks.push({ pass: false, rule: 'Must be of sound mind', detail: 'A court has declared you of unsound mind. This disqualifies from voting.' }); }
  else { checks.push({ pass: true, rule: 'Sound Mind', detail: '✅ No court declaration of unsound mind' }); }

  if (convicted) { eligible = false; checks.push({ pass: false, rule: 'No disqualifying conviction', detail: 'Conviction under certain laws disqualifies from voting.' }); }
  else { checks.push({ pass: true, rule: 'No Disqualifying Conviction', detail: '✅ No disqualifying criminal conviction' }); }

  if (!inVoterList) { checks.push({ pass: false, rule: 'Name in Electoral Roll', detail: 'Your name is not yet in the voter list. Register at voters.eci.gov.in', warning: true }); }
  else { checks.push({ pass: true, rule: 'Name in Electoral Roll', detail: '✅ Name found in electoral roll' }); }

  res.json({
    eligible,
    checks,
    message: eligible
      ? '🎉 Congratulations! You are eligible to vote. Make sure your name is in the voter list at voters.eci.gov.in'
      : '❌ You may not be eligible to vote based on your responses. Check eci.gov.in for more information or call Voter Helpline 1950.',
    nextSteps: eligible
      ? ['Register at voters.eci.gov.in if not already registered', 'Find your polling booth on the Voter Helpline App', 'Carry your Voter ID or any approved ID on voting day']
      : ['Visit eci.gov.in for detailed eligibility rules', 'Call Voter Helpline 1950 for assistance'],
    sources: ['Representation of the People Act, 1951 — Section 16', 'Constitution of India — Article 326']
  });
});

// POST /api/eligibility/candidate
router.post('/candidate', (req, res) => {
  const { age, citizen, registeredVoter, officeOfProfit, convicted, electionType } = req.body;

  const minAge = electionType === 'rajya_sabha' ? 30 : 25;
  const checks = [];
  let eligible = true;

  if (age < minAge) { eligible = false; checks.push({ pass: false, rule: `Age ${minAge}+ for ${electionType === 'rajya_sabha' ? 'Rajya Sabha' : 'Lok Sabha/Assembly'}`, detail: `You must be at least ${minAge} years old.` }); }
  else { checks.push({ pass: true, rule: `Age ${minAge}+`, detail: `Age ${age} — ✅ Meets age requirement` }); }

  if (!citizen) { eligible = false; checks.push({ pass: false, rule: 'Indian Citizen', detail: 'Only Indian citizens can contest elections.' }); }
  else { checks.push({ pass: true, rule: 'Indian Citizen', detail: '✅ Indian citizenship confirmed' }); }

  if (!registeredVoter) { eligible = false; checks.push({ pass: false, rule: 'Must be a Registered Voter', detail: 'You must be registered as a voter to contest.' }); }
  else { checks.push({ pass: true, rule: 'Registered Voter', detail: '✅ Registered voter confirmed' }); }

  if (officeOfProfit) { eligible = false; checks.push({ pass: false, rule: 'Must not hold Office of Profit', detail: 'Holding a government office of profit disqualifies you from contesting.' }); }
  else { checks.push({ pass: true, rule: 'No Office of Profit', detail: '✅ No office of profit held' }); }

  if (convicted) { eligible = false; checks.push({ pass: false, rule: 'No disqualifying conviction (2+ year sentence)', detail: 'A conviction with 2+ year imprisonment disqualifies from contesting.' }); }
  else { checks.push({ pass: true, rule: 'No Disqualifying Conviction', detail: '✅ No disqualifying conviction' }); }

  res.json({
    eligible,
    checks,
    message: eligible
      ? '🎉 You appear eligible to contest elections! Visit your nearest Returning Officer to file your nomination.'
      : '❌ You may not be eligible to contest based on your responses. Consult a legal advisor or visit eci.gov.in.',
    nextSteps: eligible
      ? ['Contact your Returning Officer (RO) for nomination forms', 'Prepare your affidavit (Form 26) declaring assets and liabilities', 'Arrange security deposit (₹25,000 for Lok Sabha)', 'Study the Model Code of Conduct']
      : ['Visit eci.gov.in for candidacy guidelines', 'Consult a legal advisor', 'Call Voter Helpline 1950'],
    sources: ['Representation of the People Act, 1951 — Section 33, 36', 'Constitution of India — Articles 84, 102, 173, 191']
  });
});

module.exports = router;
