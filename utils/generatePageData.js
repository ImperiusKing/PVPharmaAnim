export function generateData(page) {
  const chains = [
    {
      title: page?.dc1Title ?? null,
      description: page?.dc1Text ?? null,
      image: {
        id: page.dc1Background.id,
        width: page.dc1Background.width,
        height: page.dc1Background.height,
        url: page.dc1Background.url,
      },
    },
    {
      title: page?.dc2Title ?? null,
      description: page?.dc2Text ?? null,
      image: {
        id: page.dc2Background.id,
        width: page.dc2Background.width,
        height: page.dc2Background.height,
        url: page.dc2Background.url,
      },
    },
    {
      title: page?.dc3Title ?? null,
      description: page?.dc3Text ?? null,
      image: {
        id: page.dc3Background.id,
        width: page.dc3Background.width,
        height: page.dc3Background.height,
        url: page.dc3Background.url,
      },
    },
  ];

  const works = [
    {
      id: Math.floor(Math.random() * 10000),
      amount: page?.tt1Title ?? null,
      description: page?.tt1Text ?? null,
      descriptionx: page?.tt1Textx ?? null,
    },
    {
      id: Math.floor(Math.random() * 10000),
      amount: page?.tt2Title ?? null,
      description: page?.tt2Text ?? null,
      descriptionx: page?.tt2Textx ?? null,
    },
    {
      id: Math.floor(Math.random() * 10000),
      amount: page?.tt3Title ?? null,
      description: page?.tt3Text ?? null,
      descriptionx: page?.tt3Textx ?? null,
    },
    {
      id: Math.floor(Math.random() * 10000),
      amount: page?.tt4Title ?? null,
      description: page?.tt4Text ?? null,
      descriptionx: page?.tt4Textx ?? null,
    },
    {
      id: Math.floor(Math.random() * 10000),
      amount: page?.tt5Title ?? null,
      description: page?.tt5Text ?? null,
      descriptionx: page?.tt5Textx ?? null,
    },
  ];

  const awards = [
    {
      title: page?.gt1Title ?? null,
      image: {
        id: page.gt1Background.id,
        url: page.gt1Background.url,
      },
    },
    {
      title: page?.gt2Title ?? null,
      image: {
        id: page.gt2Background.id,
        url: page.gt2Background.url,
      },
    },
    {
      title: page?.gt3Title ?? null,
      image: {
        id: page.gt3Background.id,
        url: page.gt3Background.url,
      },
    },
    {
      title: page?.gt4Title ?? null,
      image: {
        id: page.gt4Background.id,
        url: page.gt4Background.url,
      },
    },
    {
      title: page?.gt5Title ?? null,
      image: {
        id: page.gt5Background.id,
        url: page.gt5Background.url,
      },
    },
    {
      title: page?.gt6Title ?? null,
      image: {
        id: page.gt6Background.id,
        url: page.gt6Background.url,
      },
    },
    {
      title: page?.gt7Title ?? null,
      image: {
        id: page.gt7Background.id,
        url: page.gt7Background.url,
      },
    },
    {
      title: page?.gt8Title ?? null,
      image: {
        id: page.gt8Background.id,
        url: page.gt8Background.url,
      },
    },
    {
      title: page?.gt9Title ?? null,
      image: {
        id: page.gt9Background.id,
        url: page.gt9Background.url,
      },
    },
    {
      title: page?.gt10Title ?? null,
      image: {
        id: page.gt10Background.id,
        url: page.gt10Background.url,
      },
    },
  ];

  return { chains, awards, works };
}
