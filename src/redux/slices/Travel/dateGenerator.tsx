import type { DateAvailability } from "./TravelSlice";
import type { ITravelPackage } from "./TravelSlice";

export function generateFutureDatesDynamic(pkg: ITravelPackage, count = 3): DateAvailability[] {
  const today = new Date();

  // Parse duration like '4 Days / 3 Nights'
  const durationStr = pkg.translations.en.overview?.duration || "1 Day / 0 Nights";
  const match = durationStr.match(/(\d+)\s*Days?/i);
  const tripDays = match ? parseInt(match[1], 10) : 1;

  // Random offsets generator
  function getOffsets(): number[] {
    const offsets: number[] = [];
    let lastOffset = 0;
    for (let i = 0; i < count; i++) {
      // Random gap between 2 and 5 days
      const gap = Math.floor(Math.random() * 4) + 2;
      lastOffset += gap;
      offsets.push(lastOffset);
    }
    return offsets;
  }

  const offsets = getOffsets();

  return offsets.map((offset, index) => {
    const start = new Date(today);
    start.setDate(today.getDate() + offset);

    const end = new Date(start);
    end.setDate(start.getDate() + tripDays); // use duration from overview

    return {
      id: `${pkg.id}-date-${index + 1}`,
      startDate: Math.floor(start.getTime() / 1000),
      endDate: Math.floor(end.getTime() / 1000),
      maxTravelers: 20,
      availableSpots: 15,
      price: 100 + index * 50,
      travelPackageId: pkg.id,
    };
  });
}
