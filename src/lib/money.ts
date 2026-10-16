export const money = new Intl.NumberFormat("en-UK", {
  style: "currency",
  currency: "GBP",
  maximumFractionDigits: 0,
});

export const formatMoney = (value: number): string => money.format(value);
