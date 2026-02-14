import yaml from 'yaml';
import { type MaybeRef, toValue } from 'vue';

export { formatYaml };

function formatYaml({
  rawYaml,
  sortKeys = false,
  indentSize = 2,
}: {
  rawYaml: MaybeRef<string>
  sortKeys?: MaybeRef<boolean>
  indentSize?: MaybeRef<number>
}) {
  const parsedYaml = yaml.parse(toValue(rawYaml));

  const formattedYAML = yaml.stringify(parsedYaml, {
    sortMapEntries: toValue(sortKeys),
    indent: toValue(indentSize),
  });

  return formattedYAML;
}
