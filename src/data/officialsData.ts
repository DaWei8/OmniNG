import { Official } from "@/lib/types";
import { governors } from "./governors";
import { ministers } from "./ministers";
import { senators } from "./senators";
import { directors } from "./director";
import { presidential } from "./presidential";
import { lgChairmen } from "./lgchairmen";

export const officialsData: Official[] = [
    ...presidential,
    ...governors,
    ...ministers,
    ...senators,
    ...directors,
    ...lgChairmen
];
