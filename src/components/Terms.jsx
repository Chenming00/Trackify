import React from 'react';
import { ChevronLeft } from 'lucide-react';
import Logo from './Logo';

export default function Terms({ onBack }) {
  return (
    <div className="min-h-screen bg-[#F7F8FA] text-slate-900 font-sans p-6 md:p-12 selection:bg-emerald-100 selection:text-emerald-900">
      <div className="max-w-4xl mx-auto bg-white rounded-3xl p-8 md:p-16 shadow-sm border border-slate-100">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-slate-500 hover:text-slate-800 transition-colors mb-12 group"
        >
          <ChevronLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          <span className="font-semibold text-sm">返回首页</span>
        </button>

        <div className="flex items-center gap-4 mb-4">
          <Logo className="w-12 h-12" />
          <h1 className="text-3xl md:text-4xl font-black tracking-tight text-slate-900">使用条款</h1>
        </div>
        <p className="text-sm text-slate-400 mb-12">生效日期：2026年4月7日</p>

        <div className="space-y-10 text-slate-600 leading-loose">
          <section>
            <h2 className="text-xl font-bold text-slate-800 mb-4 pb-2 border-b border-slate-100">1. 协议接受</h2>
            <p className="text-base text-slate-600">
              欢迎使用 Trackify（以下简称“本平台”或“本服务”）。本《使用条款》（以下简称“本协议”）是您与 Trackify 开发者之间关于使用本服务的法定协议。当您通过 GitHub 授权登录或以其他任何方式访问、使用本服务时，即表示您已阅读、充分理解并同意接受本协议所有条款的约束。如果您不同意本协议的任何内容，请立即停止使用本服务。
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-800 mb-4 pb-2 border-b border-slate-100">2. 服务说明与授权</h2>
            <p className="text-base text-slate-600 mb-3">
              2.1 <strong>服务内容：</strong> Trackify 提供个人账务与资产管理的可视化追踪服务，通过数学摊销逻辑帮助用户分析消费的日均成本。您可以录入各类资产凭证、数额及日期等数据。
            </p>
            <p className="text-base text-slate-600">
              2.2 <strong>授权许可：</strong> 在您遵守本协议的前提下，我们授予您一项全球性的、非排他性的、不可转让的、基于“原样”的有限许可，允许您为了个人非商业目的访问和使用本服务。
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-800 mb-4 pb-2 border-b border-slate-100">3. 用户账户与安全（OAuth 授权）</h2>
            <p className="text-base text-slate-600 mb-3">
              3.1 <strong>第三方授权：</strong> 本服务采用第三方账号（GitHub）作为唯一身份认证接入渠道（OAuth 2.0）。您必须确保授权使用的 GitHub 账户为您本人合法拥有。
            </p>
            <p className="text-base text-slate-600">
              3.2 <strong>安全责任：</strong> 您应当妥善保管您的第三方认证账户及其密码。因您自身账户遭到窃取或非法访问所导致的 Trackify 后台数据泄露、丢失，本平台不承担任何赔偿责任。
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-800 mb-4 pb-2 border-b border-slate-100">4. 用户行为规范与数据所有权</h2>
            <p className="text-base text-slate-600 mb-3">
              4.1 <strong>数据产权：</strong> 您在 Trackify 录入的所有资产数据、账单流水、自定义标签及图片链接，其知识产权及所有权归属您本人所有。本平台承诺绝不对其进行商业倒卖或未经授权的数据挖掘。
            </p>
            <p className="text-base text-slate-600 mb-3">
              4.2 <strong>行为限制：</strong> 本平台禁止任何人使用未经授权的自动化工具（如爬虫软件、爆破机器人等）对服务接口进行批量操作。您不得利用本平台从事任何违反您所在国家或地区法律法规的洗钱、走私账目隐匿等犯罪活动追踪。
            </p>
            <p className="text-base text-slate-600">
              4.3 <strong>违规处理：</strong> 若发现您违反上述行为规范，本平台有权在不事先通知的情况下，限制、暂停或永久封禁您的账户，并提交流管部门依法处理。
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-800 mb-4 pb-2 border-b border-slate-100">5. 知识产权与商标声明</h2>
            <p className="text-base text-slate-600">
              本平台的设计版式、源代码结构、渲染逻辑、UI 界面、算法公式、Logo 标识（包括但不限于文字、图像与交互形式）均属于 Trackify 的核心知识产权。未经明文书面许可，您不得针对本服务进行反向工程、反编译、仿制、出售、出租或建立衍生商业产品。
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-800 mb-4 pb-2 border-b border-slate-100">6. 免责声明与责任限制</h2>
            <p className="text-base text-slate-600 mb-3">
              6.1 <strong>按原样提供：</strong> Trackify 目前属于免费的、技术性质的测试或开放服务，按“原样 (As Is)”及“可用水平 (As Available)”提供，不作任何明示或暗示的法定形式担保（包括对商业适销性或特定目的适用性的保证）。
            </p>
            <p className="text-base text-slate-600 mb-3">
              6.2 <strong>数据风险免责：</strong> 尽管我们采用了 Supabase Row Level Security 等业界先进安全架构防止越权漏洞，但受制于互联网环境的客观不确定性，本平台不对因黑客攻击、不可抗力、服务器硬件物理损坏带来的资料丢失或连带经济损失负责。
            </p>
            <p className="text-base text-slate-600">
              6.3 <strong>间接损害免责：</strong> 在适用法律允许的最大范围内，无论是否已被告知可能的损害，Trackify 均不对任何惩罚性、附带的或间接性的利润/商誉损坏承担赔偿责任。
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-800 mb-4 pb-2 border-b border-slate-100">7. 服务变更、中断与终止</h2>
            <p className="text-base text-slate-600">
              我们保留在不提供特定通知的情况下，自行决定随时修改、暂停或永久终止服务全部或部分的权利。本服务如果最终停止运营，您将尽力被提前告知，并允许在指定时间内进行数据的 JSON 离线导出。
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-800 mb-4 pb-2 border-b border-slate-100">8. 协议的生效与法律管辖</h2>
            <p className="text-base text-slate-600">
              8.1 本协议的解释及争议解决均适用所在注册地的属地法律规定。如果本协议的某一条款在法庭审理下被判定为无效，不影响其他条款的独立法律效力。<br/>
              8.2 我们有权随时更新本条款。若您在收到条款更新通知或公告后继续使用本服务，视为您已接收更新的全部法定内容。
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
