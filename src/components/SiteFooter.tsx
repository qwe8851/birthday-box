import { Link } from 'react-router-dom'
export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <span>🎁</span>
          <div>
            <strong>Event Box</strong>
            <p>마음을 특별한 경험으로 전하는 이벤트 제작 서비스</p>
          </div>
        </div>
        <div className="footer-columns">
          <div>
            <b>서비스</b>
            <Link to="/release-notes">릴리즈 노트</Link>
            <span>2026년 8월 첫 공개</span>
            <span>Version 1.0</span>
          </div>
          <div>
            <b>만든이</b>
            <span>송승희</span>
            <a href="mailto:dgh07027@gmail.com">dgh07027@gmail.com</a>
          </div>
          <div>
            <b>문의하기</b>
            <a href="mailto:dgh07027@gmail.com?subject=%5BEvent%20Box%5D%20오류%20제보">
              오류 제보
            </a>
            <a href="mailto:dgh07027@gmail.com?subject=%5BEvent%20Box%5D%20개선%20요청">
              개선 요청
            </a>
            <a href="mailto:dgh07027@gmail.com?subject=%5BEvent%20Box%5D%20문의">기타 문의</a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">© 2026 Event Box · Made with care by 송승희</div>
    </footer>
  )
}
