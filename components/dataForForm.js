export const data = {
  categories: [
    {
      name: "Recipes",
      keys: [
        {
          display: "Category",
          type: "select",
          dataSet: ["Specialty", "Side", "Drink", "Desert"],
        },
        { display: "Title", type: "string" },
        { display: "Price", type: "number" },
        { display: "Description", type: "textArea" },
        { display: "In Stock", type: "boolean" },
        { display: "Spicy", type: "boolean" },
        { display: "Gluten Free", type: "boolean" },
      ],
    },
    // {name: "Tacos", keys: [
    //     {display: "Proteins", }
    // ]}
    {
      name: "User",
      keys: [
        { display: "First Name", type: "string" },
        { display: "Last Name", type: "string" },
        { display: "Username", type: "string" },
        { display: "Password", type: "password" },
        { display: "Confirm Password", type: "password" },
      ],
    },
    {
      name: "Tacos",
      keys: [],
      subCategories: [
        { display: "Tortilla", type: "string" },
        { display: "Protein", type: "string" },
        { display: "Toppings", type: "string" },
        { display: "Add-on", type: "string" },
      ],
    },
  ],
};

export const submissionHandler = (someData) => {
  console.log("Running from handler");
};
