import { Participant, Track } from 'livekit-client';
import * as React from 'react';
import { useEnsureParticipant } from '../../contexts';
import { useMediaTrack } from '../../hooks';
import { ParticipantClickEvent } from './ParticipantView';

export interface MediaTrackProps<T extends HTMLMediaElement = HTMLMediaElement>
  extends Omit<React.HTMLAttributes<T>, 'children'> {
  participant?: Participant;
  source: Track.Source;
  onTrackClick?: (evt: ParticipantClickEvent) => void;
}

/**
 * The MediaTrack component is responsible for rendering participant media tracks like `camera`, `microphone` and `screen_share`.
 * This component must have access to the participant's context, or alternatively pass it a `Participant` as a property.
 *
 * @example
 * ```tsx
 * {...}
 *   <ParticipantView>
 *     <MediaTrack source={Track.Source.Camera} />
 *     <MediaTrack source={Track.Source.Microphone} />
 *   </ParticipantView>
 * {...}
 * ```
 *
 * @see `ParticipantView` component
 */
export function MediaTrack({ onTrackClick, onClick, ...props }: MediaTrackProps) {
  const participant = useEnsureParticipant(props.participant);

  const mediaEl = React.useRef<HTMLVideoElement>(null);
  const { elementProps, publication } = useMediaTrack({
    participant,
    source: props.source,
    element: mediaEl,
    props,
  });

  const clickHandler = (evt: React.MouseEvent<HTMLMediaElement, MouseEvent>) => {
    onClick?.(evt);
    onTrackClick?.({ participant, publication });
  };

  return (
    <>
      {props.source === Track.Source.Camera || props.source === Track.Source.ScreenShare ? (
        <video ref={mediaEl} {...elementProps} muted={true} onClick={clickHandler}></video>
      ) : (
        <audio ref={mediaEl} {...elementProps}></audio>
      )}
    </>
  );
}
