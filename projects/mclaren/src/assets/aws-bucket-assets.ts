const baseBucketUrl = 'https://mclaren-assets.s3.amazonaws.com';

const bucketAssets = {
  landing: {
    hero: baseBucketUrl + '/assets-web/749580611251840298msoAnimationV3.mp4',
    futurePerformance: baseBucketUrl + '/assets-web/MSO_LAB%20Asset_1400x1120.png',
    supercarCompany: baseBucketUrl + '/assets-web/MCL014_MSO_Philosophy_Static_no_text_1800x3360.jpg',
    community: baseBucketUrl + '/assets-web/MCL014_McLaren%20Family_Static_no%20text_1800x3360.jpg',
    comingSoon: baseBucketUrl + '/assets-web/FINAL_001-Coming-Soon.mp4',
    genesisVideo: baseBucketUrl + '/assets-web/mclarenTeaser_treatment01_v020.mp4',
  },
  collection: {
    featured: baseBucketUrl + '/assets-web/MCL_GTR_ICON_PaypayaLegend_3Q_v001_comp_v05.png',
    aboutSection:
      baseBucketUrl + '/assets-web/FINAL_MCL_P1_Honorary_A_3Q_V001_NapierGreen_comp_v04_no_graphic_1400x1120.png',
  },
};

export default { baseBucketUrl, ...bucketAssets };
