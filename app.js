function calculateDeliveryDate() {
  // Get user inputs
  const orderDate = new Date(document.getElementById("order-date").value);
  const unstitchedDays =
    parseInt(document.getElementById("unstitched-blouse").value) || 0;
  const stitchedDays =
    parseInt(document.getElementById("stitched-blouse").value) || 0;
  const wrapOnDays =
    parseInt(document.getElementById("wrap-on-saree").value) || 0;

  // Validate that order date is provided
  if (isNaN(orderDate.getTime())) {
    alert("Please provide a valid order date.");
    return;
  }

  // Calculate total days to add based on user input
  let totalDaysToAdd = unstitchedDays + stitchedDays + wrapOnDays;

  // Calculate the estimated delivery date
  const estimatedDate = addWorkingDays(orderDate, totalDaysToAdd);
  const unstitchedDays1 = addWorkingDays(orderDate, unstitchedDays);
  const stitchedDays1 = addWorkingDays(
    orderDate,
    unstitchedDays + stitchedDays
  );
  const wrapOnDays1 = addWorkingDays(
    orderDate,
    unstitchedDays + stitchedDays + wrapOnDays
  );

  // Construct the output message with breakdown
  let breakdown = `The dispatch time for unstitched blouse is ${unstitchedDays} days and the estimated delivery date in that case will be ${unstitchedDays1.toDateString()}.`;
  if (stitchedDays > 0)
    breakdown += ` The dispatch timeline for stitched blouse is additional ${stitchedDays} days and the estimated delivery date in that case is ${stitchedDays1.toDateString()}.`;
  if (wrapOnDays > 0)
    breakdown += `The dispatch time for wrap-on saree is additional ${wrapOnDays} days and the estimated delivery in that case is ${wrapOnDays1.toDateString()}`;
  breakdown += `So according to the above breakdown, your estimated delivery date is ${estimatedDate.toDateString()}`;

  const message = `Hi, According to the timeline mentioned on our website, expected delivery date is ${estimatedDate.toDateString()}. The breakdown is: ${breakdown}`;

  // Output the results
  document.getElementById("delivery-date").innerText =
    estimatedDate.toDateString();
  document.getElementById("delivery-breakdown").innerText = message;
}

// Helper function to add working days, excluding Sundays
function addWorkingDays(date, daysToAdd) {
  let currentDate = new Date(date);
  let daysAdded = 0;

  while (daysAdded < daysToAdd) {
    currentDate.setDate(currentDate.getDate() + 1);
    // If it's not a Sunday, increment the daysAdded counter
    if (currentDate.getDay() !== 0) {
      daysAdded++;
    }
  }

  return currentDate;
}
