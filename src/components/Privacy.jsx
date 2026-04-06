import React from 'react';
import { ChevronLeft } from 'lucide-react';
import Logo from './Logo';

export default function Privacy({ onBack }) {
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
          <h1 className="text-3xl md:text-4xl font-black tracking-tight text-slate-900">隐私与数据保护声明</h1>
        </div>
        <p className="text-sm text-slate-400 mb-12">生效日期：2026年4月7日</p>

        <div className="space-y-10 text-slate-600 leading-loose">
          <section>
            <h2 className="text-xl font-bold text-slate-800 mb-4 pb-2 border-b border-slate-100">1. 引言与信息保护承诺</h2>
            <p className="text-base text-slate-600">
              Trackify 珍视并敬重您的个人与财务数据隐私权。在这个数字监控被滥用的时代，我们致力于为您提供一个安全的、只受属于您个人掌控的数据庇护所。本《隐私保护声明》（下称“本声明”）全面阐释了我们在您使用本服务时，如何收集、隔离和使用必要信息，以及您的法定知情权和被遗忘权。
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-800 mb-4 pb-2 border-b border-slate-100">2. 我们如何以有限方式采集信息</h2>
            <p className="text-base text-slate-600 font-semibold mb-2">2.1 第三方身份认证数据 (OAuth)：</p>
            <p className="text-base text-slate-600 mb-4">
              为了建立无账密的安全防线，我们引入了 GitHub 作为身份提供商。当您授权关联时，本平台仅向 GitHub 索取公开标识所需的最基础身份资料——您的账户名 (Username / Name)、加密的唯一标识符 (Provider ID) 和电子邮件地址。我们不持有、也无法触及您的密码明文。
            </p>
            <p className="text-base text-slate-600 font-semibold mb-2">2.2 应用内资产记录数据 (User Content)：</p>
            <p className="text-base text-slate-600">
              即您主动录入本平台的“核心使用资产”、名称、数额、标记开始使用的时间，以及可能关联的云端图片 URL。这部分信息将被明确视为敏感的“高限制个人资产隐私”并实行强物理隔离处理。
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-800 mb-4 pb-2 border-b border-slate-100">3. 基于不可越权协议的数据存储与隔离 (RLS)</h2>
            <p className="text-base text-slate-600 mb-3">
              区别于绝大多数传统平台在应用层代码进行粗暴软隔离，**您的数据由 Supabase 架构直接接管并推流至底层 PostgreSQL 数据服务器，同时全面锁定了行级别的强制安全性 (Row Level Security)**。
            </p>
            <p className="text-base text-slate-600">
              在 RLS 技术下：针对表内的每一行记录都强制施加基于身份标识 (`auth.uid() = user_id`) 的硬连线鉴权。这意味着，就算是我们的系统存在极小的 API 调用级别漏洞，非您本人的身份令牌 (JWT Token) 在数据库层也将遭受绝对的驳回。即便后台管理员进行粗放型拉取指令，系统级别的防护也会自动过滤不属于管理员本人关联的任何数据。您的隐私在此得到了最苛刻的技术尊严保证。
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-800 mb-4 pb-2 border-b border-slate-100">4. 我们如何使用与不使用您的信息</h2>
            <ul className="list-disc pl-5 space-y-2 text-base text-slate-600">
              <li><strong>唯一目的担保：</strong>我们仅将收集到的信息用于：提供、运行并不断迭代资产计算服务本体；确保跨平台访问时的身份追踪连贯。</li>
              <li><strong>绝对的不出售担保：</strong>我们在任何法律定义下都不会对外出售您的数据日志，也不会作为广告特征提取样本与任何分析厂商 (诸如 Facebook Pixel、Google Analytics) 共享。您的资产只是您自己的成本计算底稿。</li>
              <li><strong>服务器环境监控：</strong>本平台可能收集部分匿名的浏览器堆栈错误日志 (Trace Level Logs) 用于修正线上 Bug 以及保障基础的网络抗压服务运转，但不提取任何关联具体 `user_id` 资产内容。</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-800 mb-4 pb-2 border-b border-slate-100">5. 第三方外链处理责任声明</h2>
            <p className="text-base text-slate-600">
              当您选择上传非本域所持有的第三方图片链接（如 CDN 或第三方电商原图 URL）作为表单贴图或生成社交分享卡片截图（Html2Canvas）时，这可能触发您本地浏览器对该第三方的连接请求。请注意，本政策不覆盖并且我们无法干涉第三方站点如何追踪您的溯源 IP 及 Headers，此风险您需在填入外链时知晓并规避。
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-800 mb-4 pb-2 border-b border-slate-100">6. 您享有的法定数据控制权 (GDPR 准则参照)</h2>
            <p className="text-base text-slate-600 mb-3">
              您对记录于本平台的核心隐私拥有完整的法律主动权利：
            </p>
            <ul className="list-disc pl-5 space-y-2 text-base text-slate-600">
              <li><strong>访问权与修改权：</strong> 您可以无条件登入应用前台自由修改、调阅并全览所有留存在本平台上的过往与现有数据状态。</li>
              <li><strong>被彻底遗忘权：</strong> 若您希望彻底粉碎您的足迹，您有权选择清空面板；若需注销本站点与您 GitHub 的纽带并抹除该 user_id 的所有历史映射池，可在 GitHub 设置面版剥离授权。我们在接收到对应软封转销指令后，底层空间将被物理清扫丢弃。</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-800 mb-4 pb-2 border-b border-slate-100">7. 关于政策调整</h2>
            <p className="text-base text-slate-600">
              为跟随全球日趋严紧的数据合规框架，我们有权就本隐私保护声明做出定期勘误和更新。变更生效前我们将在首页更新其修订版次。如变更可能令您的合法边界倒退缩进（例如授权使用目的的扩大），届时我们必须获取您的重新确认交互。否则，您对网站的正常访问被视为对最新版本隐私框架的许可。
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
