import { Injectable } from '@angular/core';

@Injectable()
export class RegionService {

  regionData = {
    'Northland': ['Far North', 'Kaipara', 'Whangarei'],
    'Auckland': ['Auckland City', 'Franklin', 'Hauraki Gulf Islands',
    'Manukau City', 'North Shore City', 'Papakura', 'Rodney', 'Waiheke Island', 'Waitakere City'],
    'Bay Of Plenty': ['Kawerau', 'Opotiki', 'Rotorua', 'Tauranga', 'Wetern Bay Of Plenty', 'Whakatane'],
    'Coromandel': ['Thames-Coromandel'],
    'Waikato': ['Hamilton', 'Hauraki', 'Matamata-Piako', 'Otorohanga', 'South Waikato', 'Waikato', 'Waipa', 'Waitomo'],
    'Gisborne': ['Gisborne'],
    'Central North Island' : ['Ruapehu', 'Taupo'],
    'Hawkes Bay' : ['Central Hawkes Bay', 'Hastings', 'Napier City', 'Wairoa'],
    'Taranaki' : ['New Plymouth', 'South Taranaki', 'Stratford'],
    'Manawatu / Wanganui ': ['Horowhenua', 'Manawatu', 'Palmerston North City', 'Rangitikei', 'Tararua', 'Wanganui'],
    'Wairarapa': ['Carterton', 'Masterton', 'South Wairarapa'],
    'Wellington': ['Kapiti', 'Lower Hutt City', 'Porirua City', 'Upper Hutt City', 'Wellington City'],
    'Marlborough': ['Kaikoura', 'Marlborough'],
    'Nelson & Bays': ['Nelson', 'Tasman'],
    'West Coast': ['Buller', 'Grey', 'Westland'],
    'Canterbury': ['Ashburton', 'Banks Peninsula', 'Christchurch City', 'Hurunui',
    'Mackenzie', 'Selwyn', 'Timaru', 'Waimakariri', 'Waimate'],
    'Central Otago / Lakes District': ['Central Otago', 'Queenstown', 'Wanaka'],
    'Otago' : ['Clutha', 'Dunedin City', 'Waitaki'],
    'Southland' : ['Gore', 'Invercargill City', 'Southland']
  };
  constructor() { }

  getRegionData() {
    return this.regionData;
  }

}
