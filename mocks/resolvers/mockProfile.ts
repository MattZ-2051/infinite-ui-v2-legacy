export const mockProfile = async (request, response, context) => {
  return response(
    context.json([
      {
        _id: '60f1bea51c02aa74e14f0a04',
        tags: [],
        showNotifyMe: false,
        role: 'issuer',
        externalId: 'auth0|bd409c81-4c67-4b5d-b7b2-671673bde23d',
        username: 'Roberto_Clemente',
        hederaAccount: '0.0.2131864',
        createdAt: '2021-07-16T17:15:17.540Z',
        updatedAt: '2021-09-06T18:01:23.361Z',
        __v: 0,
        descriptionShort:
          'Roberto Enrique Clemente Walker was a Puerto Rican professional baseball right fielder who played 18 seasons in Major League Baseball for the Pittsburgh Pirates. After his early death, he was posthumously inducted into the National Baseball Hall of Fame in 1973, becoming both the first Caribbean and the first Latino-American player to be enshrined.',
        profilePhotoUrls: [
          {
            url: 'https://infinite-digital-aria.s3.amazonaws.com/TESTING/RobertoClemente-Images/RC-Website-About-Us-Framework-July2018-The-Foundation-background-mobile1.png',
            position: '1',
          },
          {
            url: 'https://infinite-digital-aria.s3.amazonaws.com/TESTING/RobertoClemente-Images/CM11_edit%201.png',
            position: '2',
          },
          {
            url: 'https://infinite-digital-aria.s3.amazonaws.com/TESTING/RobertoClemente-Images/TheARIAExchange.mp4',
            position: '3',
          },
          {
            url: 'https://infinite-digital-aria.s3.amazonaws.com/TESTING/RobertoClemente-Images/4d52bf206d8a0625f50a7282e8c6549b-1.png',
            position: '4',
          },
        ],
        profileTextFields: [
          { text: 'Exclusive Drop September 15th', position: '1' },
          {
            text: '"Any time you have an opportunity to make a difference in this world and you don\'t, then you are wasting your time on Earth."',
            position: '2',
          },
          {
            text: '"Roberto Clemente played the game of baseball with great passion. That passion could only be matched by his unrelenting commitment to make a difference in the lives of the less fortunate and those in need. People saw Roberto as a great ballplayer and humanitarian. He was also a great father, husband, teammate and friend." - Manny Sanguillen',
            position: '3',
          },
        ],
        firstName: 'Roberto',
        lastName: 'Clemente',
        profilePhotoUrl: 'https://infinite-digital-aria.s3.amazonaws.com/TESTING/RobertoClemente-Images/Avatar.png',
        featured: true,
        verified: true,
        nftSocialAssets: [
          {
            url: 'https://infinite-digital-aria.s3.amazonaws.com/TESTING/RobertoClemente-Images/Socials/CM19%20FB/CM19%20FB%20Post.png',
            name: 'facebook',
            key: 'TESTING/RobertoClemente-Images/Socials/CM19 FB/CM19 FB Post.png',
            bucket: 'infinite-digital-aria',
            size: 1_205_021,
            type: 'image/png',
            width: 1200,
            height: 630,
            hash: 'c31c41d142928c0fd9f9c44e4c53c961ce8a6575608f931722c41a102f066a05',
            previewUrl:
              'https://infinite-digital-aria.s3.amazonaws.com/TESTING/RobertoClemente-Images/Socials/CM19 FB/CM19 FB Post_preview_300.png',
            platform: 'facebook',
          },
          {
            url: 'https://infinite-digital-aria.s3.amazonaws.com/TESTING/RobertoClemente-Images/Socials/CM28%20Twitter/CM28%20Twitter%20Card.png',
            name: 'twitter',
            key: 'TESTING/RobertoClemente-Images/Socials/CM28 Twitter/CM28 Twitter Card.png',
            bucket: 'infinite-digital-aria',
            size: 673_898,
            type: 'image/png',
            width: 600,
            height: 600,
            hash: '24ff2a801740048ffd52beff5208444750852eca40e0694853bc93a6ecdefd31',
            previewUrl:
              'https://infinite-digital-aria.s3.amazonaws.com/TESTING/RobertoClemente-Images/Socials/CM28 Twitter/CM28 Twitter Card_preview_300.png',
            platform: 'twitter',
          },
        ],
      },
    ])
  );
};
