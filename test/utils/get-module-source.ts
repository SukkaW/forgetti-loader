import type webpack from 'webpack';

export default function getModuleSource(id: string, stats: webpack.Stats) {
  const { modules } = stats.toJson({ source: true });
  const $module = modules?.find((m) => m.name?.endsWith(id));

  if (!$module) {
    throw new TypeError(`Module ${id} not found`);
  }

  return $module.source;
}
