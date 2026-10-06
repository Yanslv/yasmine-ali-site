import {
  BookOpenText,
  Brain,
  ChatsCircle,
  Compass,
  InstagramLogo,
  MicrophoneStage,
} from "@phosphor-icons/react/dist/ssr";
import type { IconName } from "@/content/site-content";
import { tokens } from "@/design/tokens";

const icons = {
  instagram: InstagramLogo,
  microphone: MicrophoneStage,
  chats: ChatsCircle,
  brain: Brain,
  compass: Compass,
  book: BookOpenText,
} as const;

export const defaultIconSize = Number.parseInt(tokens.icons.defaultSize, 10);

export function Icon({
  name,
  size = defaultIconSize,
  className,
}: {
  name: IconName;
  size?: number;
  className?: string;
}) {
  const Component = icons[name];
  return <Component size={size} weight="duotone" aria-hidden="true" focusable="false" className={className} />;
}
