import { Fee } from "../utils/types";
import { format, parseISO } from "date-fns";

export const getMonthlyFees = (studentId: string, fees: Fee[]) => {
  const studentFees = fees.filter((fee) => fee.studentId === studentId);
  const monthlyFees: {
    [key: string]: { status: Fee["status"]; amount: number };
  } = {};

  studentFees.forEach((fee) => {
    const month = format(parseISO(fee.dueDate), "MMMM yyyy");
    if (!monthlyFees[month]) {
      monthlyFees[month] = { status: "unpaid", amount: 0 };
    }
    monthlyFees[month].amount += fee.amount;
    if (fee.status === "paid") {
      monthlyFees[month].status = "paid";
    } else if (
      fee.status === "pending" &&
      monthlyFees[month].status !== "paid"
    ) {
      monthlyFees[month].status = "pending";
    }
  });

  return monthlyFees;
};
