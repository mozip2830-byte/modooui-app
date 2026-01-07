import React, { useState } from 'react';
import { Calendar, MapPin, Home, Clock, Star, MessageSquare, ChevronRight, Bell, Send, Camera, Filter, X, Phone } from 'lucide-react';

const CustomerApp = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [selectedRegion, setSelectedRegion] = useState('all');
  const [showRegionFilter, setShowRegionFilter] = useState(false);
  const [viewingPartnerProfile, setViewingPartnerProfile] = useState(null);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [selectedBidForChat, setSelectedBidForChat] = useState(null);
  const [showReviewModal, setShowReviewModal] = useState(null);
  const [chatMessages, setChatMessages] = useState({});
  const [currentMessage, setCurrentMessage] = useState('');
  const [newReview, setNewReview] = useState({ rating: 5, comment: '' });
  
  const regions = ['전체', '강남구', '송파구', '서초구', '강동구', '관악구'];

  const maskName = (name) => {
    if (name.length <= 2) return name;
    return name[0] + 'X'.repeat(name.length - 2) + name[name.length - 1];
  };

  const partnerProfiles = {
    1: {
      id: 1, name: '깔끔청소', phone: '010-1234-5678', rating: 4.8, totalReviews: 234, totalJobs: 450,
      introduction: '10년 경력의 전문 청소 업체입니다.',
      reviews: [
        { customerName: '김지은', rating: 5, comment: '정말 꼼꼼하게 청소해주셨어요!', date: '2026-01-05' },
        { customerName: '박준호', rating: 5, comment: '시간 약속도 잘 지키시고 친절하셔서 좋았습니다.', date: '2026-01-03' }
      ]
    },
    2: {
      id: 2, name: '반짝이클리닝', phone: '010-5678-1234', rating: 4.9, totalReviews: 189, totalJobs: 380,
      introduction: '친환경 세제만 사용하는 전문 청소 업체입니다.',
      reviews: [{ customerName: '정수진', rating: 5, comment: '친환경 세제 사용해주셔서 안심이었어요!', date: '2026-01-04' }]
    },
    3: {
      id: 3, name: '프로청소', phone: '010-9876-5432', rating: 4.7, totalReviews: 156, totalJobs: 290,
      introduction: '가성비 최고의 청소 서비스!',
      reviews: [{ customerName: '홍길동', rating: 5, comment: '가격 대비 정말 만족스러웠어요.', date: '2026-01-02' }]
    }
  };

  const [requests, setRequests] = useState([
    {
      id: 1, address: '서울시 강남구 역삼동 123-45', region: '강남구', area: 35,
      cleaningType: '일반 청소', date: '2026-01-10', time: '14:00', status: 'bidding',
      description: '방 2개, 화장실 1개 청소 부탁드립니다.', images: [],
      bids: [
        { id: 1, partnerId: 1, partnerName: '깔끔청소', price: 75000, duration: '2시간', 
          message: '10년 경력의 전문가가 방문합니다.', rating: 4.8, reviews: 234, totalJobs: 450 },
        { id: 2, partnerId: 2, partnerName: '반짝이클리닝', price: 78000, duration: '2.5시간', 
          message: '친환경 세제만 사용합니다.', rating: 4.9, reviews: 189, totalJobs: 380 },
        { id: 3, partnerId: 3, partnerName: '프로청소', price: 72000, duration: '2시간', 
          message: '가성비 최고!', rating: 4.7, reviews: 156, totalJobs: 290 }
      ]
    }
  ]);

  const [newRequest, setNewRequest] = useState({
    address: '', region: '강남구', area: '', cleaningType: '일반 청소',
    date: '', time: '', description: '', images: []
  });

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const imageUrls = files.map(file => URL.createObjectURL(file));
    setNewRequest({...newRequest, images: [...newRequest.images, ...imageUrls]});
  };

  const submitRequest = () => {
    if (newRequest.address && newRequest.area && newRequest.date) {
      setRequests([...requests, { id: requests.length + 1, ...newRequest, status: 'new', bids: [] }]);
      setNewRequest({ address: '', region: '강남구', area: '', cleaningType: '일반 청소', date: '', time: '', description: '', images: [] });
      setActiveTab('myRequests');
    }
  };

  const selectBid = (requestId, bidId) => {
    setRequests(requests.map(req => {
      if (req.id === requestId) {
        const bid = req.bids.find(b => b.id === bidId);
        return {...req, status: 'confirmed', selectedBid: { partnerName: bid.partnerName, partnerId: bid.partnerId, price: bid.price, duration: bid.duration, rating: bid.rating }};
      }
      return req;
    }));
    setSelectedRequest(null);
  };

  const sendMessage = (requestId, bidId) => {
    if (currentMessage.trim()) {
      const key = `${requestId}-${bidId}`;
      setChatMessages({...chatMessages, [key]: [...(chatMessages[key] || []), { id: Date.now(), sender: 'customer', message: currentMessage, time: new Date().toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' }) }]});
      setCurrentMessage('');
      setTimeout(() => setChatMessages(prev => ({...prev, [key]: [...(prev[key] || []), { id: Date.now()+1, sender: 'partner', message: '네, 확인했습니다!', time: new Date().toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' }) }]})), 1000);
    }
  };

  const submitReview = (requestId) => {
    setRequests(requests.map(req => req.id === requestId ? {...req, status: 'completed', review: { rating: newReview.rating, comment: newReview.comment, date: new Date().toLocaleDateString('ko-KR') }} : req));
    setShowReviewModal(null);
    setNewReview({ rating: 5, comment: '' });
  };

  const filteredRequests = selectedRegion === 'all' ? requests : requests.filter(req => req.region === selectedRegion);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 pb-24">
      <div className="bg-white shadow-sm sticky top-0 z-40">
        <div className="max-w-2xl mx-auto px-6 py-4">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">🏠 모두의집</h1>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-6 py-6">
        {activeTab === 'home' && (
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-3xl p-8 text-white shadow-xl">
              <h2 className="text-3xl font-bold mb-3">안녕하세요! 👋</h2>
              <p className="text-blue-100 text-lg mb-6">어떤 청소 서비스가 필요하신가요?</p>
              <button onClick={() => setActiveTab('newRequest')} className="bg-white text-blue-600 px-8 py-4 rounded-2xl font-bold text-lg">청소 요청하기 →</button>
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">청소 서비스 종류</h3>
              <div className="grid grid-cols-2 gap-4">
                {[{t:'일반 청소',e:'🏠'},{t:'입주/이사 청소',e:'📦'},{t:'사무실 청소',e:'🏢'},{t:'특수 청소',e:'✨'}].map((s,i) => (
                  <div key={i} className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-all cursor-pointer">
                    <div className="text-4xl mb-3">{s.e}</div>
                    <div className="font-bold text-gray-800">{s.t}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'newRequest' && (
          <div className="bg-white rounded-3xl p-6 shadow-sm">
            <h2 className="text-2xl font-bold mb-6">청소 요청서 작성 📝</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-bold mb-2">청소 종류</label>
                <select value={newRequest.cleaningType} onChange={(e) => setNewRequest({...newRequest, cleaningType: e.target.value})} className="w-full p-4 border-2 rounded-xl">
                  <option>일반 청소</option><option>입주/이사 청소</option><option>사무실 청소</option><option>특수 청소</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-bold mb-2">지역</label>
                <select value={newRequest.region} onChange={(e) => setNewRequest({...newRequest, region: e.target.value})} className="w-full p-4 border-2 rounded-xl">
                  {regions.filter(r => r !== '전체').map(r => <option key={r}>{r}</option>)}
                </select>
              </div>
              <input type="text" placeholder="주소" value={newRequest.address} onChange={(e) => setNewRequest({...newRequest, address: e.target.value})} className="w-full p-4 border-2 rounded-xl" />
              <input type="number" placeholder="면적(평)" value={newRequest.area} onChange={(e) => setNewRequest({...newRequest, area: e.target.value})} className="w-full p-4 border-2 rounded-xl" />
              <div className="grid grid-cols-2 gap-4">
                <input type="date" value={newRequest.date} onChange={(e) => setNewRequest({...newRequest, date: e.target.value})} className="p-4 border-2 rounded-xl" />
                <input type="time" value={newRequest.time} onChange={(e) => setNewRequest({...newRequest, time: e.target.value})} className="p-4 border-2 rounded-xl" />
              </div>
              <textarea placeholder="상세 설명" value={newRequest.description} onChange={(e) => setNewRequest({...newRequest, description: e.target.value})} className="w-full p-4 border-2 rounded-xl" rows="4" />
              <div>
                {newRequest.images.length > 0 && (
                  <div className="grid grid-cols-3 gap-3 mb-3">
                    {newRequest.images.map((img, idx) => (
                      <div key={idx} className="relative">
                        <img src={img} alt="" className="w-full h-24 object-cover rounded-xl" />
                        <button onClick={() => setNewRequest({...newRequest, images: newRequest.images.filter((_, i) => i !== idx)})} className="absolute -top-2 -right-2 bg-red-500 text-white w-6 h-6 rounded-full"><X size={14} /></button>
                      </div>
                    ))}
                  </div>
                )}
                <label className="block">
                  <input type="file" accept="image/*" multiple onChange={handleImageUpload} className="hidden" />
                  <div className="border-2 border-dashed rounded-xl p-6 text-center cursor-pointer">
                    <Camera size={32} className="mx-auto mb-2 text-gray-400" />
                    <div className="text-sm">사진 추가하기</div>
                  </div>
                </label>
              </div>
              <button onClick={submitRequest} className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-5 rounded-2xl font-bold">요청서 제출하기</button>
            </div>
          </div>
        )}

        {activeTab === 'myRequests' && (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">내 요청 현황</h2>
              <button onClick={() => setShowRegionFilter(true)} className="flex items-center gap-2 bg-white px-4 py-2 rounded-xl border-2">
                <Filter size={16} />
                <span className="text-sm font-bold">{selectedRegion === 'all' ? '전체' : selectedRegion}</span>
              </button>
            </div>
            {filteredRequests.map(req => (
              <div key={req.id} onClick={() => setSelectedRequest(req)} className="bg-white rounded-3xl p-6 shadow-sm cursor-pointer">
                <div className="flex justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold mb-2">{req.cleaningType}</h3>
                    <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
                      <MapPin size={14} />{req.address}
                    </div>
                    <div className="text-sm text-gray-500">{req.area}평 • {req.date} {req.time}</div>
                  </div>
                  <ChevronRight size={24} className="text-gray-400" />
                </div>
                {req.status === 'new' && <div className="bg-yellow-50 text-yellow-700 px-4 py-3 rounded-xl text-sm font-bold flex items-center gap-2"><Bell size={16} />입찰 대기중</div>}
                {req.status === 'bidding' && <div className="bg-green-50 text-green-700 px-4 py-3 rounded-xl text-sm font-bold">✨ {req.bids.length}개 견적 도착!</div>}
                {req.status === 'confirmed' && req.selectedBid && (
                  <div className="bg-blue-50 rounded-xl p-4">
                    <div className="text-sm text-gray-600 mb-2">선택한 업체</div>
                    <div className="flex justify-between items-center mb-3">
                      <div>
                        <div className="font-bold">{req.selectedBid.partnerName}</div>
                        <div className="flex items-center gap-1 text-sm"><Star size={14} className="fill-yellow-400 text-yellow-400" />{req.selectedBid.rating}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-xl font-bold text-blue-600">{req.selectedBid.price.toLocaleString()}원</div>
                        <div className="text-sm text-gray-500">{req.selectedBid.duration}</div>
                      </div>
                    </div>
                    <button onClick={(e) => { e.stopPropagation(); setShowReviewModal(req); }} className="w-full bg-blue-500 text-white py-2 rounded-xl font-bold">리뷰 작성하기</button>
                  </div>
                )}
                {req.status === 'completed' && req.review && (
                  <div className="bg-purple-50 rounded-xl p-4">
                    <div className="text-sm text-gray-600 mb-2">작성한 리뷰</div>
                    <div className="flex items-center gap-1 mb-2">
                      {[1,2,3,4,5].map(s => <Star key={s} size={16} className={s <= req.review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'} />)}
                    </div>
                    <div className="text-sm">{req.review.comment}</div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg">
        <div className="max-w-2xl mx-auto px-6 py-3">
          <div className="grid grid-cols-3 gap-2">
            {[{tab:'home',icon:<Home size={24}/>,label:'홈'},{tab:'newRequest',icon:'✏️',label:'요청하기'},{tab:'myRequests',icon:<Bell size={24}/>,label:'내 요청'}].map((item,i) => (
              <button key={i} onClick={() => setActiveTab(item.tab)} className={`py-3 rounded-xl font-bold ${activeTab === item.tab ? 'bg-blue-50 text-blue-600' : 'text-gray-400'}`}>
                <div className="text-2xl mx-auto mb-1">{item.icon}</div>
                <div className="text-xs">{item.label}</div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {showRegionFilter && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-end z-50" onClick={() => setShowRegionFilter(false)}>
          <div className="bg-white rounded-t-3xl w-full max-w-2xl p-6" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-xl font-bold mb-4">지역 선택</h3>
            <div className="space-y-2">
              {regions.map(r => (
                <button key={r} onClick={() => { setSelectedRegion(r === '전체' ? 'all' : r); setShowRegionFilter(false); }}
                  className={`w-full p-4 rounded-xl font-bold ${(selectedRegion === 'all' && r === '전체') || selectedRegion === r ? 'bg-blue-500 text-white' : 'bg-gray-50'}`}>{r}</button>
              ))}
            </div>
          </div>
        </div>
      )}

      {viewingPartnerProfile && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-end z-50" onClick={() => setViewingPartnerProfile(null)}>
          <div className="bg-white rounded-t-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="p-6 space-y-6">
              <div className="flex justify-between">
                <h2 className="text-2xl font-bold">업체 프로필</h2>
                <button onClick={() => setViewingPartnerProfile(null)} className="text-2xl">✕</button>
              </div>
              {(() => { const p = partnerProfiles[viewingPartnerProfile]; return (
                <>
                  <div>
                    <h3 className="text-2xl font-bold mb-3">{p.name}</h3>
                    <div className="flex items-center gap-4 mb-4">
                      <div className="flex items-center gap-2">
                        <Star size={20} className="fill-yellow-400 text-yellow-400" />
                        <span className="text-xl font-bold">{p.rating}</span>
                        <span className="text-gray-500">({p.totalReviews}개)</span>
                      </div>
                      <span>완료 {p.totalJobs}건</span>
                    </div>
                    <p className="mb-4">{p.introduction}</p>
                    <button onClick={() => alert(`전화: ${p.phone}`)} className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2">
                      <Phone size={20} />전화 연결 ({p.phone})
                    </button>
                  </div>
                  <div>
                    <h4 className="text-lg font-bold mb-3">고객 리뷰 ({p.reviews.length})</h4>
                    {p.reviews.map((r,i) => (
                      <div key={i} className="bg-gray-50 rounded-xl p-4 mb-3">
                        <div className="flex justify-between mb-2">
                          <span className="font-bold">{maskName(r.customerName)}</span>
                          <span className="text-xs text-gray-400">{r.date}</span>
                        </div>
                        <div className="flex gap-1 mb-2">
                          {[1,2,3,4,5].map(s => <Star key={s} size={14} className={s <= r.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'} />)}
                        </div>
                        <p className="text-sm">{r.comment}</p>
                      </div>
                    ))}
                  </div>
                </>
              )})()}
            </div>
          </div>
        </div>
      )}

      {selectedRequest && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-end z-50" onClick={() => setSelectedRequest(null)}>
          <div className="bg-white rounded-t-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="p-6 space-y-6">
              <div className="flex justify-between">
                <h2 className="text-2xl font-bold">{selectedRequest.cleaningType}</h2>
                <button onClick={() => setSelectedRequest(null)}>✕</button>
              </div>
              <div className="bg-gray-50 rounded-2xl p-4">
                <div className="flex items-center gap-2 mb-2"><MapPin size={16} />{selectedRequest.address}</div>
                <div className="flex gap-4 text-sm">
                  <span><Home size={14} className="inline"/> {selectedRequest.area}평</span>
                  <span><Calendar size={14} className="inline"/> {selectedRequest.date}</span>
                  <span><Clock size={14} className="inline"/> {selectedRequest.time}</span>
                </div>
                {selectedRequest.description && <div className="mt-2 pt-2 border-t"><div className="text-xs text-gray-500">상세 설명</div><div>{selectedRequest.description}</div></div>}
              </div>
              {selectedRequest.images?.length > 0 && (
                <div>
                  <h3 className="font-bold mb-3">첨부 사진</h3>
                  <div className="grid grid-cols-3 gap-3">
                    {selectedRequest.images.map((img,i) => <img key={i} src={img} className="w-full h-24 object-cover rounded-xl" />)}
                  </div>
                </div>
              )}
              {selectedRequest.bids.length > 0 && (
                <div>
                  <h3 className="text-lg font-bold mb-4">받은 견적 ({selectedRequest.bids.length})</h3>
                  {selectedRequest.bids.sort((a,b) => a.price - b.price).map(bid => (
                    <div key={bid.id} className="border-2 rounded-2xl p-5 mb-3">
                      <div className="flex justify-between mb-3">
                        <div>
                          <div className="font-bold text-lg text-blue-600 cursor-pointer" onClick={(e) => { e.stopPropagation(); setViewingPartnerProfile(bid.partnerId); }}>
                            {bid.partnerName} →
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <Star size={14} className="fill-yellow-400 text-yellow-400" />
                            <span>{bid.rating}</span>
                            <span className="text-gray-500">리뷰 {bid.reviews}개</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-blue-600">{bid.price.toLocaleString()}원</div>
                          <div className="text-sm text-gray-500">{bid.duration}</div>
                        </div>
                      </div>
                      <div className="bg-gray-50 rounded-xl p-3 mb-3 text-sm">{bid.message}</div>
                      <div className="flex gap-2">
                        <button onClick={(e) => { e.stopPropagation(); setSelectedBidForChat({requestId: selectedRequest.id, bid}); }} className="flex-1 border-2 border-blue-500 text-blue-600 py-3 rounded-xl font-bold">채팅하기</button>
                        <button onClick={() => selectBid(selectedRequest.id, bid.id)} className="flex-1 bg-blue-500 text-white py-3 rounded-xl font-bold">선택하기</button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {selectedBidForChat && (
        <div className="fixed inset-0 bg-white z-50 flex flex-col">
          <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-6 text-white">
            <button onClick={() => setSelectedBidForChat(null)}>← </button>
            <span className="ml-3 font-bold">{selectedBidForChat.bid.partnerName}</span>
          </div>
          <div className="flex-1 overflow-y-auto p-6 bg-gray-50">
            {(chatMessages[`${selectedBidForChat.requestId}-${selectedBidForChat.bid.id}`] || []).map(msg => (
              <div key={msg.id} className={`flex mb-3 ${msg.sender === 'customer' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[70%] p-4 rounded-2xl ${msg.sender === 'customer' ? 'bg-blue-500 text-white' : 'bg-white'}`}>
                  <div>{msg.message}</div>
                  <div className={`text-xs mt-1 ${msg.sender === 'customer' ? 'text-blue-100' : 'text-gray-400'}`}>{msg.time}</div>
                </div>
              </div>
            ))}
          </div>
          <div className="p-4 bg-white border-t">
            <div className="flex gap-2">
              <input type="text" value={currentMessage} onChange={(e) => setCurrentMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && sendMessage(selectedBidForChat.requestId, selectedBidForChat.bid.id)}
                placeholder="메시지 입력..." className="flex-1 p-4 border-2 rounded-xl" />
              <button onClick={() => sendMessage(selectedBidForChat.requestId, selectedBidForChat.bid.id)} className="bg-blue-500 text-white px-6 rounded-xl">
                <Send size={20} />
              </button>
            </div>
          </div>
        </div>
      )}

      {showReviewModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-end z-50" onClick={() => setShowReviewModal(null)}>
          <div className="bg-white rounded-t-3xl w-full max-w-2xl p-6" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-2xl font-bold mb-6">리뷰 작성</h3>
            <div className="mb-6">
              <div className="text-sm font-bold mb-3">서비스는 어떠셨나요?</div>
              <div className="flex gap-2 justify-center">
                {[1,2,3,4,5].map(s => (
                  <button key={s} onClick={() => setNewReview({...newReview, rating: s})}>
                    <Star size={40} className={s <= newReview.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'} />
                  </button>
                ))}
              </div>
            </div>
            <textarea placeholder="서비스에 대한 솔직한 의견을 남겨주세요" value={newReview.comment}
              onChange={(e) => setNewReview({...newReview, comment: e.target.value})}
              className="w-full p-4 border-2 rounded-xl" rows="5" />
            <button onClick={() => submitReview(showReviewModal.id)} className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-4 rounded-2xl font-bold mt-4">
              리뷰 등록하기
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomerApp;