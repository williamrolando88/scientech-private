import { EventParser, ProjectParser } from '@src/lib/parsers/projects';
import { z } from 'zod';

export type Project = z.infer<typeof ProjectParser>;

export type Event = z.infer<typeof EventParser>;
