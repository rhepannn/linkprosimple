const { updateApplicationStatus } = require("../app/actions/affiliate-applications");
const dotenv = require("dotenv");
dotenv.config({ path: ".env.local" });

async function testApprove() {
  const pendingAppId = "4db62ec8-ef3c-4d08-8fd0-cc3f4919c48f"; // ID of the pending application
  console.log("Attempting to approve application:", pendingAppId);
  const result = await updateApplicationStatus(pendingAppId, "approved");
  console.log("Result of approval action:", result);
}

testApprove();
