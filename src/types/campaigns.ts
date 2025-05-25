
export interface BaseCampaign {
  id: number;
  title: string;
  status: string;
}

export interface StandardCampaign extends BaseCampaign {
  recipients: number;
  openRate: string;
  clickRate: string;
  sentDate: string;
}

export interface TemplateCampaign extends BaseCampaign {
  channel: string;
  usedIn: number;
  lastUsed: string;
  createdDate: string;
}

export interface AutomatedCampaign extends BaseCampaign {
  channel: string;
  recipients: number;
  completionRate: string;
  createdDate: string;
}

export type CampaignData = StandardCampaign | TemplateCampaign | AutomatedCampaign;

export type CampaignType = "email" | "push" | "telegram" | "sms" | "templates" | "automated";
