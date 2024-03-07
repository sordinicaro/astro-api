import zod from "zod";

const chartSchema = zod.object({
      name: zod.string(),
      birthdate: zod.string(),
      time: zod.number(),
      asc: zod.number(),
      sun: zod.number(),
      moon: zod.number(),
      mercury: zod.number(),
      venus: zod.number(),
      mars:zod.number(),
      jupiter:zod.number(),
      saturn: zod.number(),
      uranus: zod.number(),
      neptune: zod.number(),
      pluto: zod.number()
    });

// const validateChart = (objChart: any) => {
//   const responseValidator = chartSchema.safeParse(objChart);
//   return responseValidator;
// };

const validatePartialChart = (objChart: any) => { //Este se usa en el updateChart
  const responseValidator = chartSchema.partial().safeParse(objChart);
  return responseValidator;
};

export {  validatePartialChart };