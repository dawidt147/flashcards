"use client";

import { Flashcard } from "@/types/interfaces";
import {
  useState,
  startTransition,
  ViewTransition,
  addTransitionType,
} from "react";
import { ArrowLeft, ArrowRight, Volume2 } from "lucide-react";
import { speak } from "@/lib/actions/speach";

type FlashcardsSliderProps = {
  flashcards: Array<Flashcard>;
};

type FlashcardsSlideProps = {
  flashcard: Flashcard;
  flipped: boolean;
};

function FlashcardSlide({ flashcard, flipped }: FlashcardsSlideProps) {
  return (
    <ViewTransition
      key={"flashcard-" + flashcard.id}
      onEnter={(instance, types) => {
        let animationStart = "translate3d(0px, 0px, 0px) rotateY(0deg)";
        let animationMiddle = "translate3d(0px, 0px, 0px) rotateY(0deg)";
        const animationEnd = "translate3d(0px, 0px, 0px) rotateY(0deg)";

        if (types.includes("left")) {
          animationStart = "translate3d(-16%, -5%, 0px) rotateY(-16deg)";
          animationMiddle = "translate3d(-8%, -1%, 0px) rotateY(-8deg)";
        } else if (types.includes("right")) {
          animationStart = "translate3d(16%, -5%, 0px) rotateY(16deg)";
          animationMiddle = "translate3d(8%, -1%, 0px) rotateY(8deg)";
        }

        const animation = [
          { transform: animationStart },
          { transform: animationMiddle, offset: 0.4 },
          { transform: animationEnd },
        ];
        const timing = { duration: 250, easing: "ease" };
        const animate = instance.new.animate(animation, timing);

        return () => {
          animate.cancel();
        };
      }}
    >
      <div
        id={"flashcard-" + flashcard.id}
        className="flashcard-slide h-80 min-w-0 grow-0 shrink-0 basis-full bg-transparent perspective-[1000px] cursor-pointer"
      >
        <div
          className={
            "flashcard-slide__inner relative w-full h-full transition-transform transform-3d duration-500" +
            (flipped ? " rotate-x-180" : "")
          }
        >
          <div className="flashcard-slide__front absolute w-full h-full backface-hidden p-4 bg-gray-500 rounded-xl">
            <div className="flashcard-slide__header absolute flex items-center justify-end w-[calc(100%-30px)]">
              <button
                onClick={(event) => {
                  event.stopPropagation();
                  speak(flashcard?.term ?? "", flashcard?.termLanguage ?? "");
                }}
                className="flashcard-slide__speak-button"
              >
                <Volume2 />
              </button>
            </div>
            <div className="flashcard-slide__content flex items-center justify-center w-full h-full">
              {flashcard.term}
            </div>
          </div>
          <div className="flashcard-slide__back absolute w-full h-full backface-hidden p-4 rotate-x-180 bg-gray-400 rounded-xl">
            <div className="flashcard-slide__header absolute flex items-center justify-end w-[calc(100%-30px)]">
              <button
                onClick={(event) => {
                  event.stopPropagation();
                  speak(
                    flashcard?.definition ?? "",
                    flashcard?.definitionLanguage ?? "",
                  );
                }}
                className="flashcard-slide__speak-button"
              >
                <Volume2 />
              </button>
            </div>
            <div className="flashcard-slide__content flex items-center justify-center w-full h-full">
              {flashcard.definition}
            </div>
          </div>
        </div>
      </div>
    </ViewTransition>
  );
}

export default function FlashcardsSlider(props: FlashcardsSliderProps) {
  const [flipped, setFlip] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);

  const goToPrev = () => {
    startTransition(() => {
      setFlip(false);
      addTransitionType("left");
      setActiveSlide(Math.max(activeSlide - 1, 0));
    });
  };
  const goToNext = () => {
    startTransition(() => {
      setFlip(false);
      addTransitionType("right");
      setActiveSlide((slide) =>
        Math.min(slide + 1, props.flashcards.length - 1),
      );
    });
  };

  return (
    <section className="slider slider--flashcards">
      <div className="slider__slides">
        <div
          className="slider__slide"
          onClick={() => setFlip(!flipped ? true : false)}
        >
          <FlashcardSlide
            flashcard={props.flashcards[activeSlide]}
            flipped={flipped}
          />
        </div>
      </div>
      <div className="slider__footer flex items-center justify-center p-4">
        <nav className="slider__nav flex gap-4">
          <button className="slider__nav--prev" onClick={goToPrev}>
            <ArrowLeft />
          </button>
          <div>
            <span>{activeSlide + 1}</span>
            <span className="mx-4">/</span>
            <span>{props.flashcards.length}</span>
          </div>
          <button className="slider__nav--next" onClick={goToNext}>
            <ArrowRight />
          </button>
        </nav>
      </div>
    </section>
  );
}
