"use client";

import {
  EmailShareButton,
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  LinkedinShareButton,
  EmailIcon,
  FacebookIcon,
  LinkedinIcon,
  WhatsappIcon,
  XIcon,
} from "react-share";
import { usePathname } from "next/navigation";

export default function ShareButton() {
  const pathname = usePathname();
  const currentUrl =
    typeof window !== "undefined" ? `${window.location.origin}${pathname}` : "";

  return (
    <div className="flex space-x-2">
      <EmailShareButton url={currentUrl}>
        <EmailIcon size={32} round />
      </EmailShareButton>
      <LinkedinShareButton url={currentUrl}>
        <LinkedinIcon size={32} round />
      </LinkedinShareButton>
      <FacebookShareButton url={currentUrl}>
        <FacebookIcon size={32} round />
      </FacebookShareButton>
      <TwitterShareButton url={currentUrl}>
        <XIcon size={32} round />
      </TwitterShareButton>
      <WhatsappShareButton url={currentUrl}>
        <WhatsappIcon size={32} round />
      </WhatsappShareButton>
    </div>
  );
}
