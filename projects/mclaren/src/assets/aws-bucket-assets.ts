const baseBucketUrl = 'https://mclaren-assets.s3.amazonaws.com';

const bucketAssets = {
  landing: {
    hero: baseBucketUrl + '/assets-web/749580611251840298msoAnimationV3.mp4',
    hero3: baseBucketUrl + '/assets-web/Landing_Hero_Video.mp4',
    futurePerformance: baseBucketUrl + '/assets-web/MSO_LAB%20Asset_1400x1120.png',
    supercarCompany: baseBucketUrl + '/assets-web/MCL014_MSO_Philosophy_Static_no_text_1800x3360.jpg',
    community: baseBucketUrl + '/assets-web/MCL014_McLaren%20Family_Static_no%20text_1800x3360.jpg',
    comingSoon: baseBucketUrl + '/assets-web/FINAL_001-Coming-Soon.mp4',
  },
};

export default { baseBucketUrl, ...bucketAssets };
