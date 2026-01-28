import { getAddonFamilies, getCatalogLocale, getPlans } from "./lib/cloudData";
import CostIndicatorClient from "./CostIndicatorClient";

export default function CostCalculator() {
  const plans = getPlans();
  const families = getAddonFamilies();
  const locale = getCatalogLocale();

  return (
    <CostIndicatorClient
      plans={plans}
      families={families}
      currency={locale.currencyCode}
      taxRate={locale.taxRate}
    />
  );
}
