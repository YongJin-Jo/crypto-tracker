interface Coin {
  id: string;
  name: string;
  symbol: string;
  rank: number;
}

interface CoinListDefine extends Coin {
  is_active: true;
  is_new: false;
  type: 'coin';
}

interface CoinInfoDefine extends Coin {
  is_new: boolean;
  is_active: boolean;
  type: string;
  tags: object;
  team: object;
  description: string;
  message: string;
  open_source: boolean;
  started_at: string;
  development_status: string;
  hardware_wallet: boolean;
  proof_type: string;
  org_structure: string;
  hash_algorithm: string;
  links: object;
  links_extended: object;
  whitepaper: object;
  first_data_at: string;
  last_data_at: string;
}

interface CoinPirceInfo extends Coin {
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  beta_value: number;
  first_data_at: string;
  last_updated: string;
  quotes: object;
}

export type { CoinListDefine, CoinInfoDefine, CoinPirceInfo };
