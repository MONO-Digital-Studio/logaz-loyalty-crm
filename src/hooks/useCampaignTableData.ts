
import { useMemo } from 'react';
import { useTableData } from './useTableData';
import { CampaignData, CampaignType } from '@/types/campaigns';

export const useCampaignTableData = (data: CampaignData[], campaignType: CampaignType) => {
  const searchFields = useMemo(() => {
    return ['title'] as (keyof CampaignData)[];
  }, []);

  const tableData = useTableData(data, searchFields);

  return tableData;
};
