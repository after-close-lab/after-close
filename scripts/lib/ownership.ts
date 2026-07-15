import type { Member } from '../../src/lib/schemas';

export type OwnershipInput = {
  actor: string;
  changedFiles: string[];
  maintainers: string[];
  members: Member[];
};

export function validateOwnership(input: OwnershipInput): string[] {
  const actor = input.actor.toLowerCase();
  if (input.maintainers.some((maintainer) => maintainer.toLowerCase() === actor)) {
    return [];
  }

  const member = input.members.find((candidate) => candidate.github.toLowerCase() === actor);
  if (!member) {
    return [`GitHub user ${input.actor} is not an invited member`];
  }

  const allowedPrefixes = [
    `src/content/records/${member.trader_id}/`,
    `src/content/reviews/${member.trader_id}/`
  ];

  return input.changedFiles
    .filter((file) => !allowedPrefixes.some((prefix) => file.startsWith(prefix)))
    .map((file) => `${input.actor} cannot modify ${file}`);
}
