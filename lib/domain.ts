export type LeadStatus = 'new'|'contacted'|'appointment'|'offer'|'won'|'lost';

export type SolavolLead = {
  id: string;
  createdAt: string;
  name: string;
  email?: string;
  phone?: string;
  city?: string;
  source: string;
  campaign?: string;
  status: LeadStatus;
  potentialValue: number;
  notes?: string;
};

export type CampaignDaily = {
  day: string;
  platform: 'meta'|'google'|'organic'|'other';
  campaignName: string;
  spend: number;
  impressions: number;
  clicks: number;
  leads: number;
};

export type CockpitKpis = {
  leads: number;
  spend: number;
  costPerLead: number;
  openOffers: number;
  openOfferValue: number;
  wonRevenue: number;
  roas: number;
};

export function calculateKpis(
  leads: SolavolLead[],
  campaigns: CampaignDaily[],
  wonRevenue = 0,
): CockpitKpis {
  const spend = campaigns.reduce((sum, row) => sum + row.spend, 0);
  const leadCount = leads.length;
  const openOffers = leads.filter((l) => l.status === 'offer').length;
  const openOfferValue = leads
    .filter((l) => l.status === 'offer')
    .reduce((sum, l) => sum + l.potentialValue, 0);

  return {
    leads: leadCount,
    spend,
    costPerLead: leadCount ? spend / leadCount : 0,
    openOffers,
    openOfferValue,
    wonRevenue,
    roas: spend ? wonRevenue / spend : 0,
  };
}
