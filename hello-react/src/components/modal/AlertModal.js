import { forwardRef } from "react";
/**
 * export: AlertModal 컴포넌트(함수)/변수/상수 등등을 외부로 공개하기 위한 방법
 * import { AlertModal } from "./path";
 *
 * export default : AlertModal 컴포넌트(함수)/변수/상수 등등을 외부로 공개하기 위한 방법
 *      AlertModal.js 파일을 import 했을 때, 대표 컴포넌트/함수/변수/상수를 공개하는 방법
 * 하나의 js 파일에 하나의 export default만 작성.
 * 한 파일 내에서 export default를 여러 번 작성 x
 * import AlertModal, { OtherComponent } from "./path";
 */

// export default function ALertModal({ children }) {
const AlertModal = forwardRef(({ onClose, children }, ref) => {
  return (
    <dialog className="modal" ref={ref}>
      <div className="modal-body">
        <section className="modal-close-button" onClick={onClose}>
          X
        </section>
        {children}
      </div>
    </dialog>
  );
});

export default AlertModal;
