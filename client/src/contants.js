const USERS_API = "/api/users";
const BOOKS_API = "/api/books";
const backEndPort = 4020;
const backEndRoot = "http://localhost";
const imagesServerPath = `http://localhost:${backEndPort}/static/uploads/images/temp/`;

export { backEndPort, backEndRoot, imagesServerPath, USERS_API, BOOKS_API };

export const bookData = [
  {
    id: 1,
    title: "Kari the Chimpanzee",
    author: "Kari Hanby",
    ISBN: "728223074-9",
    qty: 1,
    description: "Kari the flying chimpanzee",
    genre: "Crime",
    storageInfo: [
      {
        serialNumber: 22,
        aisle: "A",
        shelf: 1,
      },
      {
        serialNumber: 1,
        aisle: "B",
        shelf: 2,
      },
    ],
    additionalImages: [],
  },
  {
    id: 2,
    title: "C++ Compendium",
    author: "Bjarne Stroustrup",
    ISBN: "7282342074-9",
    qty: 10,
    description: "Learn programming with Bjarne",
    genre: "IT",
    storageInfo: [
      {
        serialNumber: 25,
        aisle: "B",
        shelf: 2,
      },
      {
        serialNumber: 1,
        aisle: "C",
        shelf: 2,
      },
      {
        serialNumber: 5,
        aisle: "C",
        shelf: 2,
      },
    ],
    additionalImages: [],
  },
];
