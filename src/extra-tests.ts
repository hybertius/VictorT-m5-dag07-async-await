// Kör från Console på tests.html: await import("/src/extra-tests.ts");
import { hamtaAllaForsiktigt } from "./api";
import { assertEqual, testAsync, visaResultat } from "./testlib";

testAsync("hamtaAllaForsiktigt: delar upp lyckade och misslyckade hämtningar", async () => {
    const { lyckade, misslyckade } = await hamtaAllaForsiktigt([2, 99, 1, 100]);

    assertEqual(lyckade.map((ratt) => ratt.id), [2, 1]);
    assertEqual(
        misslyckade.map(({ id, fel }) => ({
            id,
            meddelande: fel instanceof Error ? fel.message : String(fel),
        })),
        [
            { id: 99, meddelande: "Hittade ingen rätt med id 99" },
            { id: 100, meddelande: "Hittade ingen rätt med id 100" },
        ],
    );
});

testAsync("hamtaAllaForsiktigt: tom lista ger tomma arrayer", async () => {
    assertEqual(await hamtaAllaForsiktigt([]), { lyckade: [], misslyckade: [] });
});

void visaResultat();
