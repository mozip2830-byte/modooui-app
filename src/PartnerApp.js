import React, { useState } from 'react';
import { Home, Bell, User, TrendingUp, MapPin, DollarSign, Star, CheckCircle, Camera, X, Filter, FileText, Upload } from 'lucide-react';

const PartnerApp = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [activeTab, setActiveTab] = useState('partnerHome');
  const [partnerProfile, setPartnerProfile] = useState({
    name: '깔끔청소', rating: 4.8, totalReviews: 234, totalJobs: 450,
    introduction: '10년 경력의 전문 청소 업체입니다.',
    workPhotos: [], mainPhotoIndex: 0, businessLicense: null, verificationStatus: 'pending'
  });

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 flex items-center justify-center p-6">
        <div className="bg-white rounded-3xl p-8 shadow-xl max-w-md w-full">
          <h1 className="text-3xl font-bold text-center mb-2 bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">🏠 모두의집</h1>
          <p className="text-center text-gray-600 mb-8">파트너사 로그인</p>
          <div className="space-y-4">
            <button onClick={() => { setIsLoggedIn(true); setIsVerified(false); }} className="w-full bg-yellow-400 text-gray-800 py-4 rounded-xl font-bold">💬 카카오로 시작하기</button>
            <button onClick={() => { setIsLoggedIn(true); setIsVerified(false); }} className="w-full bg-green-600 text-white py-4 rounded-xl font-bold">N 네이버로 시작하기</button>
          </div>
          <div className="mt-8 text-center text-sm text-gray-500">
            <p>신규 가입 시 사업자등록증 제출 후</p>
            <p>인증 완료 시 서비스 이용이 가능합니다</p>
          </div>
        </div>
      </div>
    );
  }

  if (!isVerified) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 p-6">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-3xl p-8 shadow-xl">
            <h2 className="text-2xl font-bold text-center mb-6">사업자 인증</h2>
            {partnerProfile.verificationStatus === 'pending' && partnerProfile.businessLicense ? (
              <div className="bg-yellow-50 border-2 border-yellow-200 rounded-2xl p-6 text-center">
                <div className="text-5xl mb-3">⏳</div>
                <h3 className="text-xl font-bold mb-2">인증 검토중</h3>
                <p className="text-gray-600 mb-4">제출하신 사업자등록증을 검토중입니다.</p>
                <button onClick={() => setIsVerified(true)} className="mt-4 bg-green-500 text-white px-6 py-2 rounded-xl font-bold">(임시) 인증 완료하기</button>
              </div>
            ) : (
              <>
                <div className="bg-blue-50 rounded-2xl p-6 mb-6">
                  <h3 className="font-bold mb-3">📋 제출 안내</h3>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li>• 사업자등록증 사본을 업로드해주세요</li>
                    <li>• 선명한 사진 또는 스캔 파일만 가능합니다</li>
                  </ul>
                </div>
                {partnerProfile.businessLicense ? (
                  <>
                    <img src={partnerProfile.businessLicense} alt="사업자등록증" className="w-full rounded-xl border-2 mb-4" />
                    <button onClick={() => setPartnerProfile({...partnerProfile, verificationStatus: 'pending'})} className="w-full bg-green-500 text-white py-4 rounded-2xl font-bold">제출하기</button>
                  </>
                ) : (
                  <label>
                    <input type="file" accept="image/*" onChange={(e) => {
                      const file = e.target.files[0];
                      if (file) setPartnerProfile({...partnerProfile, businessLicense: URL.createObjectURL(file)});
                    }} className="hidden" />
                    <div className="border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer">
                      <Upload size={48} className="mx-auto mb-3 text-gray-400" />
                      <div className="font-bold">사업자등록증 업로드</div>
                    </div>
                  </label>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 pb-24">
      <div className="bg-white shadow-sm sticky top-0 z-40">
        <div className="max-w-2xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">🏠 모두의집</h1>
            <div className="bg-green-50 px-4 py-2 rounded-full">
              <span className="text-sm font-bold text-green-700">파트너사</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-6 py-6">
        {activeTab === 'partnerHome' && (
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-3xl p-8 text-white shadow-xl">
              <h2 className="text-2xl font-bold mb-2">🎉 신규 파트너 환영!</h2>
              <p className="text-purple-100">첫 계약 시 수수료 50% 할인</p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">📬 받은 고객 요청</h3>
              <div className="bg-white rounded-3xl p-5 shadow-sm mb-3">
                <div className="flex items-center gap-2 mb-2">
                  <h4 className="font-bold text-lg">일반 청소</h4>
                  <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold">NEW</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
                  <MapPin size={14} />서울시 강남구 역삼동 123-45
                </div>
                <div className="text-sm text-gray-500">35평 • 2026-01-10 • 1시간 전</div>
                <div className="mt-3 pt-3 border-t text-sm text-gray-500">입찰: 2건</div>
              </div>
              <button onClick={() => setActiveTab('newRequests')} className="w-full bg-green-50 text-green-600 py-3 rounded-xl font-bold">전체 요청 보기 →</button>
            </div>
            <div onClick={() => setActiveTab('profile')} className="bg-white rounded-3xl p-6 shadow-sm cursor-pointer">
              <h3 className="text-xl font-bold mb-4">📊 내 업체 현황</h3>
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600">{partnerProfile.totalReviews}</div>
                  <div className="text-sm text-gray-600 mt-1">리뷰수</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600">{partnerProfile.totalJobs}</div>
                  <div className="text-sm text-gray-600 mt-1">계약수</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-yellow-600">{partnerProfile.rating}</div>
                  <div className="text-sm text-gray-600 mt-1">평점</div>
                </div>
              </div>
              <div className="mt-4 text-center text-sm text-gray-500">탭하여 업체 정보 수정 →</div>
            </div>
          </div>
        )}

        {activeTab === 'newRequests' && (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">입찰 가능한 요청</h2>
            <div className="bg-white rounded-3xl p-5 shadow-sm">
              <div className="flex items-center gap-2 mb-2">
                <h3 className="font-bold text-lg">일반 청소</h3>
                <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold">NEW</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
                <MapPin size={14} />서울시 강남구 역삼동 123-45
              </div>
              <div className="text-sm text-gray-500">35평 • 2026-01-10 • 1시간 전</div>
              <div className="mt-3 pt-3 border-t text-sm text-gray-500">입찰: 2건</div>
            </div>
          </div>
        )}

        {activeTab === 'myBids' && (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">내 입찰 현황</h2>
            <div className="bg-white rounded-3xl p-5 shadow-sm">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="font-bold text-lg mb-1">일반 청소</h3>
                  <div className="text-sm text-gray-600">김민수</div>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <MapPin size={14} />서울시 강남구 역삼동
                  </div>
                </div>
                <span className="bg-yellow-100 text-yellow-700 px-4 py-2 rounded-full text-sm font-bold">검토중</span>
              </div>
              <div className="bg-green-50 rounded-2xl p-4">
                <div className="flex justify-between">
                  <div>
                    <div className="text-sm text-gray-600 mb-1">내 견적</div>
                    <div className="text-2xl font-bold text-green-600">75,000원</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-gray-600 mb-1">소요시간</div>
                    <div className="font-bold">2시간</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'profile' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">내 정보</h2>
            <div className="bg-white rounded-3xl p-6 shadow-sm">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-2xl font-bold mb-2">{partnerProfile.name}</h3>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <Star size={20} className="fill-yellow-400 text-yellow-400" />
                      <span className="text-xl font-bold">{partnerProfile.rating}</span>
                    </div>
                    <span className="text-gray-600">리뷰 {partnerProfile.totalReviews}개</span>
                  </div>
                </div>
              </div>
              <div className="mb-4">
                <h4 className="font-bold mb-2">업체 소개</h4>
                <p className="text-gray-700">{partnerProfile.introduction}</p>
              </div>
            </div>
            <div className="bg-gray-50 rounded-3xl p-6">
              <h3 className="font-bold mb-3 flex items-center gap-2">
                <FileText size={20} />사업자등록증 (고객에게 비공개)
              </h3>
              {partnerProfile.businessLicense && (
                <img src={partnerProfile.businessLicense} className="w-full rounded-xl border-2" alt="" />
              )}
            </div>
          </div>
        )}

        {activeTab === 'stats' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">통계</h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-3xl p-6 text-white shadow-lg">
                <div className="text-blue-100 text-sm mb-2">총 입찰</div>
                <div className="text-4xl font-bold">1건</div>
              </div>
              <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-3xl p-6 text-white shadow-lg">
                <div className="text-green-100 text-sm mb-2">수주 성공</div>
                <div className="text-4xl font-bold">0건</div>
              </div>
            </div>
            <div className="bg-white rounded-3xl p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <DollarSign size={24} className="text-green-600" />
                <h3 className="text-lg font-bold">총 수익</h3>
              </div>
              <div className="text-4xl font-bold text-green-600 mb-2">0원</div>
              <div className="text-sm text-gray-500">이번 달 누적 수익</div>
            </div>
          </div>
        )}
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg">
        <div className="max-w-2xl mx-auto px-6 py-3">
          <div className="grid grid-cols-5 gap-2">
            <button onClick={() => setActiveTab('partnerHome')} className={`py-3 rounded-xl font-bold ${activeTab === 'partnerHome' ? 'bg-green-50 text-green-600' : 'text-gray-400'}`}>
              <Home size={24} className="mx-auto mb-1" />
              <div className="text-xs">업체홈</div>
            </button>
            <button onClick={() => setActiveTab('newRequests')} className={`py-3 rounded-xl font-bold ${activeTab === 'newRequests' ? 'bg-green-50 text-green-600' : 'text-gray-400'}`}>
              <Bell size={24} className="mx-auto mb-1" />
              <div className="text-xs">새 요청</div>
            </button>
            <button onClick={() => setActiveTab('myBids')} className={`py-3 rounded-xl font-bold ${activeTab === 'myBids' ? 'bg-green-50 text-green-600' : 'text-gray-400'}`}>
              <div className="text-2xl mx-auto mb-1">📋</div>
              <div className="text-xs">내 입찰</div>
            </button>
            <button onClick={() => setActiveTab('profile')} className={`py-3 rounded-xl font-bold ${activeTab === 'profile' ? 'bg-green-50 text-green-600' : 'text-gray-400'}`}>
              <User size={24} className="mx-auto mb-1" />
              <div className="text-xs">내 정보</div>
            </button>
            <button onClick={() => setActiveTab('stats')} className={`py-3 rounded-xl font-bold ${activeTab === 'stats' ? 'bg-green-50 text-green-600' : 'text-gray-400'}`}>
              <TrendingUp size={24} className="mx-auto mb-1" />
              <div className="text-xs">통계</div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PartnerApp;